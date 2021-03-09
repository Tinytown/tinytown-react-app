import { useState, useEffect } from 'react';
import CompassHeading from 'react-native-compass-heading';
import { useSelector } from 'react-redux';
import { watchLocation, switchToBackground, stopWatchingLocation } from 'library/apis/geolocation';

export default () => {
  const [heading, setHeading] = useState(0);
  const hasPermission = useSelector((state) => state.location.hasPermission);
  const { active: appActive, settings: { backgroundGeo } } = useSelector((state) => state.app);

  const startWatching = async (authReq) => {
    CompassHeading.start(10, (newHeading) => {
      setHeading(newHeading);
    });
    watchLocation(authReq);
  };

  const stopWatching = () => {
    CompassHeading.stop();
    stopWatchingLocation();
  };

  useEffect(() => {
    if (appActive && hasPermission) {
      backgroundGeo ? startWatching('always') : startWatching('wheninuse');
    } else if (!appActive) {
      backgroundGeo ? switchToBackground() : stopWatching();
    }
  }, [appActive, hasPermission, backgroundGeo]);

  return [heading];
};
