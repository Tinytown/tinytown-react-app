import {  Animated } from 'react-native'

export default (initialStyle, animationType) => {
  const animationStyle = [initialStyle];
  let handlePressIn = null;
  let handlePressOut = null;

  switch (animationType) {
  case 'bounce':
    const bounceValue = new Animated.Value(1);
    animationStyle.push({ transform: [{ scale: bounceValue }] });

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

    return { animationStyle, handlePressIn, handlePressOut }
  default:
    break;
  }
}
