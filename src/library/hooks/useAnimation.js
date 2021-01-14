
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default (animationType) => {
  const bounceAnimation = () => {
    const scale = useSharedValue(1);
    const config = {
      mass: 1,
      damping: 3,
      stiffness: 500,
    }
    const animation = useAnimatedStyle(() => {
      return { transform: [{ scale: scale.value }] }
    });
    const animateOnPress = (state) => {
      scale.value = state === 'in' ? withSpring(0.93, config) : withSpring(1, config)
    }

    return [animation, animateOnPress]
  };

  const twistAnimation = () => {
    const INITIAL_ROTATION = 6;
    const TARGET_ROTATION = 12;
    const rotation = useSharedValue(INITIAL_ROTATION);
    const config = {
      mass: 1,
      damping: 4,
      stiffness: 250,
    }
    const animation = useAnimatedStyle(() => {
      return { transform: [{ rotateZ: `${rotation.value}deg` }] }
    });
    const animateOnPress = (state) => {
      rotation.value = state === 'in' ? withSpring(TARGET_ROTATION, config) : withSpring(INITIAL_ROTATION, config)
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
