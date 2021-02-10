import { useState, useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';

export default () => {
  const INITIAL = 0;
  const ANIMATION_DURATION = 200;
  const scrimOpacity = useSharedValue(INITIAL);
  const dialogScale = useSharedValue(INITIAL);

  const opacityConfig = {
    duration: ANIMATION_DURATION,
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
    dialogScale.value = withTiming(1, opacityConfig);
  };

  const animateClose = (callback) => {
    dialogScale.value = withTiming(INITIAL, opacityConfig);
    scrimOpacity.value =  withTiming(INITIAL, opacityConfig, () => runOnJS(callback)());
  };

  return [dialogAnimation, scrimAnimation, animateOpen, animateClose];
};
