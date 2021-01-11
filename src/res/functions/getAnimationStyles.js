import {  Animated } from 'react-native'

export default (animationType) => {
  let animation = {};
  let handlePressIn = null;
  let handlePressOut = null;

  switch (animationType) {
  case 'bounce':
    const bounceValue = new Animated.Value(1);
    animation = { transform: [{ scale: bounceValue }] };

    handlePressIn = () => {
      Animated.spring(bounceValue, {
        toValue: 0.93,
        useNativeDriver: true,
      }).start()
    }

    handlePressOut = () => {
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 3,
        tension: 120,
        useNativeDriver: true,
      }).start()
    }

    return { animation, handlePressIn, handlePressOut }
  default:
    break;
  }
}
