import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default (extraRotation = 0) => {
  const RANDOM_SIDE = Math.random() < 0.5 ? -1 : 1;
  const ANGLE = (8 + extraRotation) * RANDOM_SIDE ;
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
      ? withSpring(-ANGLE - extraRotation, config)
      : withSpring(ANGLE + extraRotation, config);
  };

  return [animation, animate];
};
