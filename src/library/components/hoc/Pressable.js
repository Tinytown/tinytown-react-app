import React from 'react'
import { Pressable, View } from 'react-native'
import PropTypes from 'prop-types';
import { animated } from 'react-spring'
import { COLORS, getAnimationStyles } from 'res';

const PressableHOC = ({
  animationType,
  containerStyle,
  shadowStyle,
  onPress = () => console.log('Pass an onPress callback to this component'),
  children,
  ...props }) => {
  const { animation, handlePressIn, handlePressOut } = getAnimationStyles(animationType);

  const AnimatedView = animated(View);

  const animationStyle = {
    borderRadius: containerStyle?.borderRadius ?? 0,
    ...shadowStyle,
    ...animation,
  }

  const maskStyle = {
    borderRadius: containerStyle?.borderRadius ?? 0,
    overflow: 'hidden',
  }

  return (
    <AnimatedView style={animationStyle} pointerEvents='box-none' >
      <View style={maskStyle} >
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={props.disabled}
          android_ripple={{ color: COLORS.steelGray }}
          style={containerStyle}
        >
          {children}
        </Pressable>
      </View>
    </AnimatedView>
  )
}

Pressable.propTypes = {
  animationType: PropTypes.string,
  containerStyle: PropTypes.object,
  shadowStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default PressableHOC;

