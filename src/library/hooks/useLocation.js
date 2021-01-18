import { useState, useEffect } from 'react';
import CompassHeading from 'react-native-compass-heading';
import { useSelector } from 'react-redux';
import { watchLocation, stopWatchingLocation } from '../apis/geolocation';

let watchId = null;

export default (callback) => {
  const [heading, setHeading] = useState(0);
  const hasPermission = useSelector((state) => state.location.hasPermission);
  const appActive = useSelector((state) => state.app.active);

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

  const shouldWatch = appActive && hasPermission;

  useEffect(() => {
    shouldWatch ? startWatching() : stopWatching();
    return () => {
      stopWatching();
    };
  }, [shouldWatch]);

  return [heading];
};
