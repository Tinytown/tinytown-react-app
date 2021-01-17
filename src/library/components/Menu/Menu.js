import React, { useState, useEffect } from 'react'
import { View, Modal, TouchableWithoutFeedback } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS, withTiming } from 'react-native-reanimated';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { COLORS, SHAPES, normalizeStyles } from 'res';

const Menu = ({
  showMenu = false,
  setShowMenu = () => console.log('Pass a setShowMenu callback to this component'),
  triggerRef = {},
  children }) => {
  const window = useSafeAreaFrame();
  const STYLE_INITIAL = 0;
  const TRANSLATE_INITIAL = 0;
  const TRANSLATE_AMOUNT = 48;

  const [menuSize, setMenuSize] = useState(null);
  const [position, setPosition] = useState(null);
  const [triggerProps, setTriggerProps] = useState(null);
  const opacity = useSharedValue(STYLE_INITIAL);
  const width = useSharedValue(STYLE_INITIAL);
  const height = useSharedValue(STYLE_INITIAL);
  const translateX = useSharedValue(TRANSLATE_INITIAL);
  const translateY = useSharedValue(TRANSLATE_INITIAL);

  const opacityConfig = {
    duration: 200,
  };

  const sizeConfig = {
    duration: 250,
  };

  const translateConfig = {
    mass: 1.5,
    damping: 30,
    stiffness: 500,
  };

  useEffect(() => {
    triggerRef.current?.measureInWindow((left, top, width, height) => setTriggerProps({ left, top, width, height }))
  }, [triggerRef?.current])

  const animation = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      width: width.value,
      height: height.value,
      overflow: 'hidden',
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }
  });

  const hide = () => {
    opacity.value = withTiming(STYLE_INITIAL, opacityConfig, () => {
      runOnJS(setShowMenu)(false);
      width.value = STYLE_INITIAL;
      height.value = STYLE_INITIAL;
      translateX.value = TRANSLATE_INITIAL;
    });
  }

  const show = () => {
    setPosition({ left: triggerProps?.left, top: triggerProps?.top })

    // Check if it fits horizontally
    if (triggerProps?.left + menuSize?.width > window.width) {
      translateX.value = triggerProps?.width - menuSize.width + TRANSLATE_AMOUNT;
      translateX.value = withSpring(-menuSize.width + triggerProps.width, translateConfig)
    } else {
      translateX.value = -TRANSLATE_AMOUNT;
      translateX.value = withSpring(TRANSLATE_INITIAL, translateConfig)
    }

    // Check if it fits vertically
    if (triggerProps?.top + menuSize?.height > window.height) {
      translateY.value = -menuSize.height + triggerProps.height + TRANSLATE_AMOUNT;
      translateY.value = withSpring(-menuSize.height + triggerProps.height, translateConfig)
    } else {
      translateY.value = -TRANSLATE_AMOUNT;
      translateY.value = withSpring(TRANSLATE_INITIAL, translateConfig)
    }

    setShowMenu(true);

    opacity.value = withTiming(1, opacityConfig);
    width.value = withTiming(menuSize?.width, sizeConfig);
    height.value = withTiming(menuSize?.height, sizeConfig);
  }

  const setDimensions = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout;
    setMenuSize({ width, height })
  }

  return (
    <Modal
      transparent
      visible={showMenu}
      onShow={show}
      onDismiss={() => console.log('hiding menu')}
      onRequestClose={hide}
    >
      <TouchableWithoutFeedback onPress={hide} >
        <View style={styles.background}>
          <Animated.View style={[animation, position]}>
            <View onLayout={setDimensions} style={styles.container} >
              {children}
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = normalizeStyles({
  container: {
    position: 'absolute',
    overflow: 'hidden',
    opacity: 1,
    backgroundColor: COLORS.justWhite,
    paddingVertical: 8,
    borderRadius: SHAPES.radiusMd,
    ...SHAPES.elevGray2,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default Menu
