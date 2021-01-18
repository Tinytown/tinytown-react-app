
import { useState } from 'react'
import { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

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
    const [trigger, setTrigger] = useState(null);
    const [menuSize, setMenuSize] = useState(null);
    const window = useSafeAreaFrame();

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

    const setDimensions = ({ nativeEvent }) => {
      const { width, height } = nativeEvent.layout;
      setMenuSize({ width, height })
    }

    const animation = useAnimatedStyle(() => {
      return {
        position: 'absolute',
        opacity: opacity.value,
        width: width.value,
        height: height.value,
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scaleX: scaleX.value }],
      }
    });

    const animate = (state, callback) => {
      if (state === 'show') {
        setPosition({ left: trigger?.left, top: trigger?.top })
        width.value = withTiming(menuSize.width, sizeConfig);
        height.value = withTiming(menuSize.height, sizeConfig);
        scaleX.value = withTiming(1, sizeConfig);

        // Check if it fits horizontally
        if (trigger?.left + menuSize?.width > window.width) {
          translateX.value = withTiming(- menuSize.width + trigger.width + TRANSLATE_AMOUNT, sizeConfig);
          translateX.value = withSpring(- menuSize.width + trigger.width, translateConfig);
        } else {
          translateX.value = -TRANSLATE_AMOUNT * 6;
          translateX.value = withSpring(TRANSLATE_INITIAL, translateConfig)
        }

        // Check if it fits vertically
        if (trigger?.top + menuSize?.height > window.height) {
          translateY.value = -menuSize.height + trigger.height;
        };

        opacity.value = withTiming(1, opacityConfig);
      } else if (state === 'hide') {
        opacity.value = withTiming(STYLE_INITIAL, opacityConfig, () => {
          runOnJS(callback)();
          width.value = STYLE_INITIAL;
          height.value = STYLE_INITIAL;
          scaleX.value = withTiming(SCALE_INITIAL, sizeConfig);
          translateX.value = TRANSLATE_INITIAL;
          translateY.value = TRANSLATE_INITIAL;
        });
      }
    }

    return [[animation, position], animate, setTrigger, setDimensions];
  }

  switch (animationType) {
  case 'bounce':
    return bounceAnimation();
  case 'twist':
    return twistAnimation();
  case 'menu':
    return menuAnimation();
  default:
    return [];
  }
}
