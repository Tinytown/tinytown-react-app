import { useState, useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import BackgroundGeolocation from 'react-native-background-geolocation';
import BackgroundGeolocationFirebase from 'react-native-background-geolocation-firebase';
import { useSelector } from 'react-redux';
import { Settings } from 'context';
import {
  watchLocation,
  stopWatchingLocation,
  startBackgroundGeo,
  stopBackgroundGeo,
  startFromTerminate,
  getLocationPermission,
  backgroundConfig,
} from 'library/apis/geolocation';
import { getIds } from 'library/apis/auth';

let watchId = null;

export default (callback) => {
  const [heading, setHeading] = useState(0);
  const { hasPermission: hasLocPermission } = useSelector((state) => state.location);
  const { settings: { backgroundGeo: backGeoEnabled }, updateSetting } = useContext(Settings.Context);
  const { auth: { isSignedIn }, app: { state: appState } } = useSelector((state) => state);

  // foreground location service
  useEffect(() => {
    if (appState === 'active' && hasLocPermission) {
      startWatching();
    } else if (appState === 'inactive' && hasLocPermission) {
      stopWatching();
      // special case for background state on iOS
    } else if (appState === 'inactive' && backGeoEnabled && Platform.OS === 'ios') {
      startFromTerminate();
    }
  }, [appState, hasLocPermission]);

  const startWatching = async () => {
    CompassHeading.start(10, (newHeading) => {
      setHeading(newHeading);
    });
    watchId = await watchLocation(callback);

    // stop background tracking
    if (backGeoEnabled && isSignedIn) {
      stopBackgroundGeo();
    }
  };

  const stopWatching = () => {
    CompassHeading.stop();
    stopWatchingLocation(watchId);

    // start background tracking
    if (backGeoEnabled && isSignedIn) {
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
      const { uid, deviceId } = getIds();
      BackgroundGeolocationFirebase.configure({
        locationsCollection: `users/${uid}/devices/${deviceId}/locations`,
      });
      BackgroundGeolocation.ready(backgroundConfig,
        () => console.log('background service is ready'),
        (error) => {
          updateSetting('backgroundGeo', false);
          console.log(error);
        }
      );
    } else {
      updateSetting('backgroundGeo', false);
    }
  };

  return [heading];
};
