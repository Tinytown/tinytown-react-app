import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default (show) => {
  const INITIAL_SCALE = 0;
  const TARGET_SCALE = 1;
  const scale = useSharedValue(INITIAL_SCALE);
  const display = useSharedValue('none');

  const config = {
    duration: 100,
  };

  const animation = useAnimatedStyle(() => (
    {
      display: display.value,
      transform: [{ scale: scale.value }],
    }
  ));

  useEffect(() => {
    if (show) {
      display.value = 'flex';
      setTimeout(() => {
        scale.value = withTiming(TARGET_SCALE, config);
      }, 5);
    } else {
      scale.value = withTiming(INITIAL_SCALE, config, () => display.value = 'none');
    }
  }, [show]);

  return [animation];
};
