import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { mapConfig } from './Map';
import Chip from './Chip';

const Countdown = ({
  timestamp = Date.now(),
  wrapperStyle,
  onExpiration = () => console.log('Shout expired'),
}) => {
  const { EXPIRATION_LENGTH, DAY_IN_MS } = mapConfig;
  const expirationTimestamp = timestamp + EXPIRATION_LENGTH;
  const [timeStr, setTimeStr] = useState(null);
  const navigation = useNavigation();

  const getRemainingTime = () => {
    const hours = Math.floor(((expirationTimestamp - Date.now()) / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor(((expirationTimestamp - Date.now()) / (1000 * 60)) % 60);
    const seconds = Math.floor(((expirationTimestamp - Date.now()) / (1000)) % 60);

    if (hours >= 1) {
      setTimeStr(`${hours + 1} ${hours + 1 === 1 ? 'hour' : 'hours'}`);
    } else if (minutes >= 1) {
      setTimeStr(`${minutes + 1} ${minutes + 1 === 1 ? 'minute' : 'minutes'}`);
    } else if (seconds > 0) {
      setTimeStr(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`);
    } else {
      setTimeStr('Shout has expired');
      onExpiration();
      navigation.goBack();
    }
  };

  const getRemainingDays = () => {
    const days = Math.floor((expirationTimestamp - Date.now()) / (1000 * 60 * 60 * 24));
    setTimeStr(`${days + 1} days left`);
  };

  useEffect(() => {
    let intervalId;

    if (expirationTimestamp <= Date.now()) {
      setTimeStr('Shout has expired');
      navigation.goBack();
    } else if (expirationTimestamp > Date.now() + DAY_IN_MS) {
      getRemainingDays();
    } else {
      getRemainingTime();
      intervalId = setInterval(() => {
        getRemainingTime();
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Chip
      wrapperStyle={wrapperStyle}
      label={timeStr ? timeStr : 'Loading...'}
      icon='clock'
      animationType={null}
      ripple={false}
    />
  );
};

Countdown.propTypes = {
  timestamp: PropTypes.number,
  wrapperStyle: PropTypes.object,
  onExpiration: PropTypes.func,
};

export default Countdown;
