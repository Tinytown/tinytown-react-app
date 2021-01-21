
import { useState, useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default (animationType, ...args) => {
  const bounceAnimation = () => {
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

  const jiggleAnimation = () => {
    const RANDOM_SIDE = Math.random() < 0.5 ? -1 : 1;
    const ANGLE = 6 * RANDOM_SIDE;
    const rotation = useSharedValue(ANGLE);
    const config = {
      mass: 1,
      damping: 8,
      stiffness: 500,
    };
    const animation = useAnimatedStyle(() => (
      { transform: [{ rotateZ: `${rotation.value}deg` }] }
    ));
    const animateOnPress = (state) => {
      rotation.value = state === 'in'
        ? withSpring(-ANGLE, config)
        : withSpring(ANGLE, config);
    };

    return [animation, animateOnPress];
  };

  const menuAnimation = () => {
    const STYLE_INITIAL = 0;
    const SCALE_INITIAL = 0.5;
    const TRANSLATE_INITIAL = 0;
    const TRANSLATE_AMOUNT = 16;
    const ANIMATION_DURATION = 200;

    const opacity = useSharedValue(STYLE_INITIAL);
    const scaleX = useSharedValue(SCALE_INITIAL);
    const width = useSharedValue(STYLE_INITIAL);
    const height = useSharedValue(STYLE_INITIAL);
    const translateX = useSharedValue(TRANSLATE_INITIAL);
    const translateY = useSharedValue(TRANSLATE_INITIAL);

    const [position, setPosition] = useState(null);
    const [triggerLayout, setTriggerLayout] = useState(null);
    const [menuLayout, setMenuLayout] = useState(null);
    const window = useSafeAreaFrame();
    const insets = useSafeAreaInsets();

    const opacityConfig = {
      duration: ANIMATION_DURATION,
    };

    const sizeConfig = {
      duration: ANIMATION_DURATION,
    };

    const translateConfig = {
      mass: 1.2,
      damping: 30,
      stiffness: 500,
    };

    const animation = useAnimatedStyle(() => (
      {
        position: 'absolute',
        opacity: opacity.value,
        width: width.value,
        height: height.value,
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scaleX: scaleX.value }],
      }
    ));

    const animate = (state) => {
      if (state === 'show') {
        setPosition({ left: triggerLayout.x, top: triggerLayout.y });
        width.value = withTiming(menuLayout.width, sizeConfig);
        height.value = withTiming(menuLayout.height, sizeConfig);
        scaleX.value = withTiming(1, sizeConfig);

        // Check if it fits horizontally
        if (triggerLayout.x + menuLayout.width > window.width) {
          translateX.value = withTiming(- menuLayout.width + triggerLayout.width + TRANSLATE_AMOUNT, sizeConfig);
          translateX.value = withSpring(- menuLayout.width + triggerLayout.width, translateConfig);
        } else {
          translateX.value = -TRANSLATE_AMOUNT * 6;
          translateX.value = withSpring(TRANSLATE_INITIAL, translateConfig);
        }

        // Check if it fits vertically
        if (triggerLayout.y + menuLayout.height > window.height - insets.bottom - insets.top) {
          translateY.value = -menuLayout.height + triggerLayout.height;
        };

        opacity.value = withTiming(1, opacityConfig);
      } else if (state === 'hide') {
        opacity.value = withTiming(STYLE_INITIAL, opacityConfig, () => {
          runOnJS(setPosition)(null);
          width.value = STYLE_INITIAL;
          height.value = STYLE_INITIAL;
          scaleX.value = withTiming(SCALE_INITIAL, sizeConfig);
          translateX.value = TRANSLATE_INITIAL;
          translateY.value = TRANSLATE_INITIAL;
        });
      }
    };

    return [[animation, position], animate, setTriggerLayout, setMenuLayout];
  };

  const flipAnimation = ([flip]) => {
    const PERSPECTIVE = 275;
    const frontRotate = useSharedValue(0);
    const backRotate = useSharedValue(180);

    useEffect(() => {
      if (flip) {
        frontRotate.value = withSpring(-180);
        backRotate.value = withSpring(0);
      } else {
        frontRotate.value = withSpring(0);
        backRotate.value = withSpring(180);
      }
    }, [flip]);

    const frontAnimation = useAnimatedStyle(() => (
      {
        position: 'absolute',
        transform: [{ perspective: PERSPECTIVE }, { rotateX: `${frontRotate.value}deg` }],
        backfaceVisibility: 'hidden',
      }
    ));

    const backAnimation = useAnimatedStyle(() => (
      {
        transform: [{ perspective: PERSPECTIVE }, { rotateX: `${backRotate.value}deg` }],
        backfaceVisibility: 'hidden',
      }
    ));

    return [frontAnimation, backAnimation];
  };

  switch (animationType) {
  case 'bounce':
    return bounceAnimation();
  case 'jiggle':
    return jiggleAnimation();
  case 'menu':
    return menuAnimation();
  case 'flip':
    return flipAnimation(args);
  default:
    return [];
  }
};
