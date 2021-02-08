import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default () => {
  const RANDOM_SIDE = Math.random() < 0.5 ? -1 : 1;
  const ANGLE = 8 * RANDOM_SIDE;
  const rotation = useSharedValue(ANGLE);

  const config = {
    mass: 1,
    damping: 8,
    stiffness: 500,
  };

  const animation = useAnimatedStyle(() => (
    { transform: [{ rotateZ: `${rotation.value}deg` }] }
  ));

  const animate = (state) => {
    rotation.value = state === 'in'
      ? withSpring(-ANGLE, config)
      : withSpring(ANGLE, config);
  };

  return [animation, animate];
};
