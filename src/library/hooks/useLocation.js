import { useState, useEffect } from 'react';
import CompassHeading from 'react-native-compass-heading';
import { watchLocation, stopWatchingLocation } from '../apis/geolocation';

let watchId = null;

export default (shouldWatch, callback) => {
  const [heading, setHeading] = useState(0);

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
    shouldWatch ? startWatching() : stopWatching();
    return () => {
      stopWatching();
    };
  }, [shouldWatch]);

  return [heading];
};
