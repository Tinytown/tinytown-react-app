import React, { useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import Animated, { withSpring, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import sheetConfig from './config';
import Scrim from '../Scrim';
import { useAnimation } from 'library/hooks';
import { SHAPES, normalizeStyles, normalizeValue } from 'res';

const BottomSheet = ({
  openSheet = true,
  setOpenSheet = () => console.log('Pass a setOpenSheet callback to this component'),
  translateY,
  setTranslateY = () => {},
  closeConfirmed = true,
  onCloseConfirm = () => console.log('Pass an onCloseConfirm callback to this component'),
  onClose = () => console.log('Pass an onClose callback to this component'),
  children,
}) => {
  const { ANIMATION_OFFSET, DISMISS_THRESHOLD } = sheetConfig;

  const [
    sheetAnimation,
    scrimAnimation,
    closeSheet,
    setSheetLayout,
    sheetTranslateY,
    translateConfig,
  ] = useAnimation('sheet', ANIMATION_OFFSET);
  const styles = generateStyles();

  const onLayoutHandler = (event) => {
    event.persist();
    const { height } = event.nativeEvent.layout;
    setSheetLayout({ height });
  };

  // Pass animated value to parent components
  useEffect(() => {
    setTranslateY(sheetTranslateY);
  }, []);

  // Close sheet / ask for confirmation
  useEffect(() => {
    if (!openSheet) {
      if (closeConfirmed) {
        closeSheet(onClose);
      } else {
        translateY.value = withSpring(ANIMATION_OFFSET, translateConfig);
        onCloseConfirm();
      }
    }
  }, [openSheet, closeConfirmed]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      if (event.translationY > 0) {
        translateY.value = context.startY + event.translationY;
      } else {
        translateY.value = context.startY + event.translationY / 12;
      }
    },
    onEnd: (event, context) => {
      if (event.translationY > DISMISS_THRESHOLD) {
        runOnJS(setOpenSheet)(false);
      } else {
        translateY.value = withSpring(context.startY, translateConfig);
      }
    },
  });

  return (
    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={normalizeValue(-40)}>
      <Scrim onPress={() => setOpenSheet(false)} animationStyle={scrimAnimation} />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[styles.card, sheetAnimation]}
          onLayout={onLayoutHandler}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    </KeyboardAvoidingView>
  );
};

const generateStyles = () => {
  return (
    normalizeStyles({
      card: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        ...SHAPES.elevGray2,
      },
    })
  ); };

BottomSheet.propTypes = {
  translateY: PropTypes.object.isRequired,
  setTranslateY: PropTypes.func.isRequired,
  openSheet: PropTypes.bool,
  setOpenSheet: PropTypes.func,
  closeConfirmed: PropTypes.bool,
  onCloseConfirm: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default BottomSheet;
