import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { useAnimation } from 'library/hooks';

export default () => {
  const CHAR_LIMIT = 80;
  const CHAR_WARNING = 10;

  const [shoutString, setShoutString] = useState('');
  const [showLimit, setShowLimit] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [animation, animate] = useAnimation('bounce');

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
    } else {
      setDisabled(false);
      setShowLimit(false);
    }
  }, [shoutString]);

  const limitChip = {
    string: `${shoutString.length} / ${CHAR_LIMIT}`,
    animation,
    show: showLimit,
    disabled,
  };

  return [shoutString, setShoutString, limitChip];
};
