import React, { useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import Animated, { withSpring, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Scrim from './Scrim';
import { useAnimation } from 'library/hooks';
import { SHAPES, COLORS, normalizeStyles, normalizeValue } from 'res';

const BottomSheet = ({
  openSheet = true,
  setOpenSheet = () => console.log('Pass a setOpenSheet callback to this component'),
  onClose = () => console.log('Pass an onClose callback to this component'),
  children,
}) => {
  const ANIMATION_OFFSET = normalizeValue(80);
  const DISMISS_THRESHOLD = normalizeValue(80);
  const [
    sheetAnimation,
    scrimAnimation,
    closeSheet,
    setSheetLayout,
    translateY,
    translateConfig,
  ] = useAnimation('sheet', ANIMATION_OFFSET);
  const styles = generateStyles({ ANIMATION_OFFSET });

  const onLayoutHandler = (event) => {
    event.persist();
    const { height } = event.nativeEvent.layout;
    setSheetLayout({ height });
  };

  useEffect(() => {
    !openSheet && closeSheet(onClose);
  }, [openSheet]);

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
    onEnd: (event) => {
      if (event.translationY > DISMISS_THRESHOLD) {
        runOnJS(setOpenSheet)(false);
      } else {
        translateY.value = withSpring(ANIMATION_OFFSET, translateConfig);
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

const generateStyles = ({ ANIMATION_OFFSET }) => {
  const insets = useSafeAreaInsets();

  return (
    normalizeStyles({
      card: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        paddingTop: 8,
        paddingBottom: insets.bottom + ANIMATION_OFFSET,
        paddingHorizontal: 16,
        borderTopLeftRadius: SHAPES.radiusMd,
        borderTopRightRadius: SHAPES.radiusMd,
        backgroundColor: COLORS.justWhite,
        ...SHAPES.elevGray2,
      },
    })
  ); };

BottomSheet.propTypes = {
  openSheet: PropTypes.bool,
  setOpenSheet: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default BottomSheet;
