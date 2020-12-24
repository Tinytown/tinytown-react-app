import { useState, useEffect } from 'react';
import CompassHeading from 'react-native-compass-heading';
import { watchLocation, stopWatchingLocation } from '../apis/geolocation';

let watching = false;
// Separate vars needed due to id starting at 0
let watchId = null;

export default (shouldWatch, callback) => {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    let isMounted = true;
    if (shouldWatch && !watching) {
      watching = true;
      CompassHeading.start(10, (newHeading) => {
        if (isMounted && newHeading) {
          setHeading(newHeading);
        }
      });

      watchLocation(callback).then((Id) => {
        watchId = Id;
      });
    } else if (watchId !== null) {
      watching = false;
      CompassHeading.stop();
      stopWatchingLocation(watchId);
    }

    return () => {
      isMounted = false;
    };
  }, [shouldWatch]);

  return [heading];
};
