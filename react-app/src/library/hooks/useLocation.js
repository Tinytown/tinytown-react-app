import { useState, useEffect } from 'react';
import CompassHeading from 'react-native-compass-heading';
import { useSelector, useDispatch } from 'react-redux';
import { updateAppSetting } from 'rdx/appState';
import {
  watchLocation,
  switchToBackground,
  stopWatchingLocation,
  getLocationPermission,
} from 'library/apis/geolocation';

let watchId = null;

export default (callback) => {
  const [heading, setHeading] = useState(0);
  const hasPermission = useSelector((state) => state.location.hasPermission);
  const { active: appActive, settings: { backgroundGeo: backGeoEnabled } } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const shouldWatch = appActive && hasPermission;
  useEffect(() => {
    shouldWatch ? startWatching() : stopWatching();
    return () => {
      stopWatching();
    };
  }, [shouldWatch]);

  useEffect(() => {
    if (backGeoEnabled) {
      initBackgroundGeo();
    }
  }, []);

  const startWatching = async () => {
    CompassHeading.start(10, (newHeading) => {
      setHeading(newHeading);
    });
    watchId = await watchLocation(callback);
  };

  const stopWatching = () => {
    CompassHeading.stop();
    stopWatchingLocation(watchId);

    // add logic for background
  };

  const initBackgroundGeo = async () => {
    const hasPermission = await getLocationPermission('always');

    if (hasPermission) {
      dispatch(updateAppSetting('backgroundGeo', true));

      // TODO
    } else {
      dispatch(updateAppSetting('backgroundGeo', false));
    }
  };

  return [heading];
};
