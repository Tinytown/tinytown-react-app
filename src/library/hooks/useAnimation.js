
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default (animationType) => {
  const bounceAnimation = () => {
    const INITIAL_SCALE = 1;
    const TARGET_SCALE = 0.94;
    const scale = useSharedValue(INITIAL_SCALE);
    const config = {
      mass: 1,
      damping: 3,
      stiffness: 750,
    }
    const animation = useAnimatedStyle(() => {
      return { transform: [{ scale: scale.value }] }
    });
    const animateOnPress = (state) => {
      scale.value = state === 'in' ? withSpring(TARGET_SCALE, config) : withSpring(INITIAL_SCALE, config)
    }

    return [animation, animateOnPress]
  };

  const twistAnimation = () => {
    const RANDOM_SIDE = Math.random() < 0.5 ? -1 : 1;
    const ANGLE = 6 * RANDOM_SIDE;
    const rotation = useSharedValue(ANGLE);
    const config = {
      mass: 1,
      damping: 8,
      stiffness: 500,
    }
    const animation = useAnimatedStyle(() => {
      return { transform: [{ rotateZ: `${rotation.value}deg` }] }
    });
    const animateOnPress = (state) => {
      rotation.value = state === 'in'
        ? withSpring(-ANGLE, config)
        : withSpring(ANGLE, config)
    }

    return [animation, animateOnPress]
  }

  switch (animationType) {
  case 'bounce':
    return bounceAnimation();
  case 'twist':
    return twistAnimation();
  default:
    return [];
  }
}
