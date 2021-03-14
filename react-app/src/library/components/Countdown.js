import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { mapConfig } from './Map';
import { Config } from 'context';
import Chip from './Chip';

const Countdown = ({
  timestamp = Date.now(),
  wrapperStyle,
  onExpiration = () => console.log('Shout expired'),
}) => {
  const { EXPIRATION_LENGTH, DAY_IN_MS } = mapConfig;
  const expirationTimestamp = timestamp + EXPIRATION_LENGTH;
  const { STRINGS } = useContext(Config.Context);
  const [timeStr, setTimeStr] = useState(null);
  const navigation = useNavigation();

  const {
    shouts: { expired },
    connectivity: { loading },
    time: { sec, secs, min, mins, hr, hrs, daysLeft },
  } = STRINGS;

  const getRemainingTime = () => {
    const hours = Math.floor(((expirationTimestamp - Date.now()) / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor(((expirationTimestamp - Date.now()) / (1000 * 60)) % 60);
    const seconds = Math.floor(((expirationTimestamp - Date.now()) / (1000)) % 60);

    if (hours >= 1) {
      setTimeStr(`${hours + 1} ${hours + 1 === 1 ? hr : hrs}`);
    } else if (minutes >= 1) {
      setTimeStr(`${minutes + 1} ${minutes + 1 === 1 ? min : mins}`);
    } else if (seconds > 0) {
      setTimeStr(`${seconds} ${seconds === 1 ? sec : secs}`);
    } else {
      setTimeStr(expired);
      onExpiration();
      navigation.goBack();
    }
  };

  const getRemainingDays = () => {
    const days = Math.floor((expirationTimestamp - Date.now()) / (1000 * 60 * 60 * 24));
    setTimeStr(`${days + 1} ${daysLeft}`);
  };

  useEffect(() => {
    let intervalId;

    if (expirationTimestamp <= Date.now()) {
      setTimeStr(expired);
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
      label={timeStr ? timeStr : loading}
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
