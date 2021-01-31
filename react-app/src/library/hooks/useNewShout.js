import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { createShout } from 'rdx/shoutState';
import  useAnimation  from './useAnimation';

export default () => {
  const CHAR_LIMIT = 80;
  const CHAR_WARNING = 10;

  const [shoutString, setShoutString] = useState('');
  const [showLimit, setShowLimit] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [animation, animate] = useAnimation('bounce');
  const dispatch = useDispatch();
  const userLocation = useSelector((state) => state.location.user);

  const debouncedBounce = useRef(_.debounce(animate, 400, { leading: true, trailing: false })); // 10/10 func name

  useEffect(() => {
    const charsLeft = CHAR_LIMIT - shoutString.length;
    if (charsLeft >= 0 && charsLeft <= CHAR_WARNING) {
      setDisabled(false);
      setShowLimit(true);
    } else if (charsLeft < 0) {
      setDisabled(true);
      setShowLimit(true);
      debouncedBounce.current();
    } else if (shoutString.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
      setShowLimit(false);
    }
  }, [shoutString]);

  const limitIndicator = {
    string: `${shoutString.length} / ${CHAR_LIMIT}`,
    animation,
    show: showLimit,
    disabled,
  };

  const createNewShout = () => {
    const shout = {
      text: shoutString,
      sourcePlatform: Platform.OS,
      coordinates: userLocation,
    };

    dispatch(createShout(shout));
  };

  return [shoutString, setShoutString, limitIndicator, createNewShout];
};
