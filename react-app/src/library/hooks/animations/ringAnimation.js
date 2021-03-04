import { useEffect } from 'react';
import shakeAnimation from './shakeAnimation';

export default (shouldRing = true) => {
  const [animation, animate] = shakeAnimation();

  useEffect(() => {
    let intervalId;
    if (shouldRing) {
      animate();
      intervalId = setInterval(() => {
        animate();
      }, 5000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [shouldRing]);

  return [animation];
};
