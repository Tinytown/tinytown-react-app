import { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';

export default () => {
  const INITIAL = 0;
  const ANIMATION_DURATION = 200;
  const scrimOpacity = useSharedValue(INITIAL);
  const dialogScale = useSharedValue(INITIAL);

  const opacityConfig = {
    duration: ANIMATION_DURATION,
  };

  const scaleConfig = {
    mass: 1.2,
    damping: 30,
    stiffness: 500,
  };

  const scrimAnimation = useAnimatedStyle(() => (
    {
      opacity: scrimOpacity.value,
    }
  ));

  const dialogAnimation = useAnimatedStyle(() => (
    {
      transform: [{ scale: dialogScale.value }],
    }
  ));

  const animateOpen = () => {
    scrimOpacity.value = withTiming(1, opacityConfig);
    dialogScale.value = withSpring(1, scaleConfig);
  };

  const animateClose = (callback) => {
    dialogScale.value = withTiming(INITIAL, opacityConfig);
    scrimOpacity.value =  withTiming(INITIAL, opacityConfig, () => runOnJS(callback)());
  };

  return [dialogAnimation, scrimAnimation, animateOpen, animateClose];
};
