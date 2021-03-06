import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

export default (amount, show) => {
  const translateX = useSharedValue(amount);
  const scaleX = useSharedValue(0);

  const springConfig = {
    mass: 1,
    damping: 32,
    stiffness: 500,
  };

  const animation = useAnimatedStyle(() => (
    {
      transform: [{ translateX: translateX.value }, { scaleX: scaleX.value }],

    }
  ));

  useEffect(() => {
    if (show) {
      translateX.value = withSpring(0, springConfig);
      scaleX.value = withTiming(1, { duration: 200 });
    } else {
      translateX.value = withSpring(amount, springConfig);
      scaleX.value = withTiming(0, { duration: 75 });
    }
  }, [show]);

  return [animation];
};
