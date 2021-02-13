import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default (show) => {
  const INITIAL_SCALE = 0;
  const TARGET_SCALE = 1;
  const scale = useSharedValue(INITIAL_SCALE);

  const config = {
    duration: 100,
  };

  const animation = useAnimatedStyle(() => (
    {
      transform: [{ scale: scale.value }],
    }
  ));

  useEffect(() => {
    if (show) {
      scale.value = withTiming(TARGET_SCALE, config);
    } else {
      scale.value = withTiming(INITIAL_SCALE, config);
    }
  }, [show]);

  return [animation];
};
