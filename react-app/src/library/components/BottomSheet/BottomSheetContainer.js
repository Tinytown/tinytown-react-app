import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import sheetConfig from './config';
import { COLORS, SHAPES, normalizeStyles } from 'res';

const BottomSheetContainer = ({
  style,
  animation,
  onLayout = () => {},
  children,
}) => {
  const { ANIMATION_OFFSET } = sheetConfig;
  const styles = generateStyles({ ANIMATION_OFFSET });

  return (
    <Animated.View style={[styles.container, style, animation]} onLayout={onLayout} >
      {children}
    </Animated.View>
  );
};

const generateStyles = ({ ANIMATION_OFFSET }) => {
  const insets = useSafeAreaInsets();

  return (
    normalizeStyles({
      container: {
        paddingTop: 8,
        paddingHorizontal: 16,
        paddingBottom: insets.bottom + ANIMATION_OFFSET,
        borderTopLeftRadius: SHAPES.radiusMd,
        borderTopRightRadius: SHAPES.radiusMd,
        backgroundColor: COLORS.justWhite,
      },
    })
  ); };

BottomSheetContainer.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  animation: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default BottomSheetContainer;
