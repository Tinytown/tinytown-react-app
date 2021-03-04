import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

export default (amount, show) => {
  const translateX = useSharedValue(amount);
  const opacity = useSharedValue(0);

  const springConfig = {
    mass: 1,
    damping: 32,
    stiffness: 500,
  };

  const animation = useAnimatedStyle(() => (
    {
      transform: [{ translateX: translateX.value }],
      opacity: opacity.value,
    }
  ));

  useEffect(() => {
    if (show) {
      translateX.value = withSpring(0, springConfig);
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      translateX.value = withSpring(amount, springConfig);
      opacity.value = withTiming(0, { duration: 10 });
    }
  }, [show]);

  return [animation];
};
