import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { useSelector, useDispatch } from 'react-redux';
import { updateAppSetting } from 'rdx/appState';
import {
  watchLocation,
  stopWatchingLocation,
  startBackgroundGeo,
  stopBackgroundGeo,
  startFromTerminate,
  getLocationPermission,
  backgroundConfig,
} from 'library/apis/geolocation';

let watchId = null;

export default (callback) => {
  const [heading, setHeading] = useState(0);
  const { hasPermission: hasLocPermission } = useSelector((state) => state.location);
  const { state: appState, settings: { backgroundGeo: backGeoEnabled } } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  // foreground location service
  useEffect(() => {
    if (appState === 'active' && hasLocPermission) {
      startWatching();
    } else if (appState === 'inactive' && hasLocPermission) {
      stopWatching();
      // special case for background state on iOS
    } else if (appState === 'inactive' && backGeoEnabled === null && Platform.OS === 'ios') {
      startFromTerminate();
    }
  }, [appState, hasLocPermission]);

  const startWatching = async () => {
    CompassHeading.start(10, (newHeading) => {
      setHeading(newHeading);
    });
    watchId = await watchLocation(callback);

    // stop background tracking
    if (backGeoEnabled !== null) {
      stopBackgroundGeo();
    }
  };

  const stopWatching = () => {
    CompassHeading.stop();
    stopWatchingLocation(watchId);

    // start background tracking
    if (backGeoEnabled) {
      startBackgroundGeo();
    }
  };

  // background location service
  useEffect(() => {
    if (backGeoEnabled) {
      initBackgroundGeo();
    }
  }, [backGeoEnabled]);

  const initBackgroundGeo = async () => {
    const hasBackGeoPermission = await getLocationPermission('always');

    if (hasBackGeoPermission) {
      BackgroundGeolocation.ready(backgroundConfig,
        () => console.log('background service is ready'),
        (error) => {
          dispatch(updateAppSetting('backgroundGeo', false));
          console.log(error);
        }
      );
    } else {
      dispatch(updateAppSetting('backgroundGeo', false));
    }
  };

  return [heading];
};
