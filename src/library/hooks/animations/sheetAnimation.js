import { useState, useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';

export default (translateOffset) => {
  const OPACITY_INITIAL = 0;
  const ANIMATION_DURATION = 200;
  const [sheetLayout, setSheetLayout] = useState(null);
  const scrimOpacity = useSharedValue(OPACITY_INITIAL);
  const sheetOpacity = useSharedValue(OPACITY_INITIAL);
  const translateY = useSharedValue(0);

  const opacityConfig = {
    duration: ANIMATION_DURATION,
  };

  const translateConfig = {
    mass: 1,
    damping: 32,
    stiffness: 500,
  };

  useEffect(() => {
    if (sheetLayout) {
      sheetOpacity.value = 1;
      translateY.value = sheetLayout.height;
      openSheet();
    }
  }, [sheetLayout]);

  const scrimAnimation = useAnimatedStyle(() => (
    {
      opacity: scrimOpacity.value,
    }
  ));

  const sheetAnimation = useAnimatedStyle(() => (
    {
      opacity: sheetOpacity.value,
      transform: [{ translateY: translateY.value }],
    }
  ));

  const openSheet = () => {
    translateY.value = withSpring(translateOffset, translateConfig);
    scrimOpacity.value = withTiming(1, opacityConfig);
  };

  const closeSheet = (callback) => {
    translateY.value =  withTiming(sheetLayout.height, opacityConfig);
    scrimOpacity.value =  withTiming(OPACITY_INITIAL, opacityConfig, () => runOnJS(callback)());
  };

  return [sheetAnimation, scrimAnimation, closeSheet, setSheetLayout];
};
