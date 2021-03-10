import { useState, useEffect } from 'react';
import CompassHeading from 'react-native-compass-heading';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { useSelector, useDispatch } from 'react-redux';
import { updateAppSetting } from 'rdx/appState';
import {
  watchLocation,
  stopWatchingLocation,
  getLocationPermission,
  backgroundConfig,
} from 'library/apis/geolocation';

const {
  DESIRED_ACCURACY_HIGH,
  DESIRED_ACCURACY_LOW,
  LOG_LEVEL_VERBOSE,
  setConfig,
  getState,
  ready,
  start,
  stop,
  onLocation,
  removeListeners,
} = BackgroundGeolocation;

let watchId = null;

export default (callback) => {
  const [heading, setHeading] = useState(0);
  const { hasPermission: hasLocPermission } = useSelector((state) => state.location);
  const { active: appActive, settings: { backgroundGeo: backGeoEnabled } } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  // foreground location service
  const shouldWatch = appActive && hasLocPermission;
  useEffect(() => {
    shouldWatch ? startWatching() : stopWatching();
  }, [shouldWatch]);

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
      ready(backgroundConfig,
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

  const startBackgroundGeo = async () => {
    try {
      const hasBackGeoPermission = await getLocationPermission('always');
      const { enabled } = await getState();

      if (!enabled && hasBackGeoPermission) {
        await start(
          () => console.log('started background service'),
          (error) => console.log(error)
        );

        onLocation(
          (location) => console.log(location),
          (error) => console.log(error)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopBackgroundGeo = async () => {
    try {
      const hasBackGeoPermission = await getLocationPermission('always');
      const { enabled } = await getState();

      if (enabled && hasBackGeoPermission) {
        await stop(
          () => console.log('stopped background service'),
          (error) => console.log(error)
        );

        // await removeListeners();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [heading];
};
