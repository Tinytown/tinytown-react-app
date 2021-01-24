import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default () => {
  const INITIAL_SCALE = 1;
  const TARGET_SCALE = 0.94;
  const scale = useSharedValue(INITIAL_SCALE);

  const config = {
    mass: 1,
    damping: 3,
    stiffness: 750,
  };

  const animation = useAnimatedStyle(() => (
    { transform: [{ scale: scale.value }] }
  ));

  const animateOnPress = (state) => {
    scale.value = state === 'in' ? withSpring(TARGET_SCALE, config) : withSpring(INITIAL_SCALE, config);
  };

  return [animation, animateOnPress];
};
