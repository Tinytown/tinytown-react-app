import { useState, useEffect } from 'react';
import CompassHeading from 'react-native-compass-heading';
import { useSelector } from 'react-redux';
import { watchLocation, switchToBackground, stopWatchingLocation } from 'library/apis/geolocation';

let watchId = null;

export default (callback) => {
  const [heading, setHeading] = useState(0);
  const hasPermission = useSelector((state) => state.location.hasPermission);
  const { active: appActive, settings: { backgroundGeo } } = useSelector((state) => state.app);

  const startWatching = async () => {
    CompassHeading.start(10, (newHeading) => {
      setHeading(newHeading);
    });
    watchId = await watchLocation(callback);
  };

  const stopWatching = () => {
    CompassHeading.stop();
    stopWatchingLocation(watchId);
  };

  useEffect(() => {
    if (appActive && hasPermission) {
      startWatching();
    } else if (!appActive) {
      backgroundGeo ? switchToBackground(watchId) : stopWatching(watchId);
    }
  }, [appActive, hasPermission, backgroundGeo]);

  return [heading];
};
