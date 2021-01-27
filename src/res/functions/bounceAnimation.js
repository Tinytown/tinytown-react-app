import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default () => {
  const INITIAL_SCALE = 1;
  const TARGET_SCALE = 1.2;
  const scale = useSharedValue(INITIAL_SCALE);

  const config = {
    duration: 100,
  };

  const animation = useAnimatedStyle(() => (
    { transform: [{ scale: scale.value }] }
  ));

  const animate = () => {
    scale.value = withTiming(TARGET_SCALE, config, () => scale.value = withTiming(INITIAL_SCALE, config));
  };
  return [animation, animate];
};
