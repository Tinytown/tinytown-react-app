import React from 'react'
import { Pressable, View } from 'react-native'
import { animated } from 'react-spring'
import { COLORS, getAnimationStyles } from 'res';

const PressableHOC = ({
  animationType,
  containerStyle,
  shadowStyle,
  onPress,
  children,
  ...props }) => {
  const { animation, handlePressIn, handlePressOut } = getAnimationStyles(animationType);

  const AnimatedView = animated(View);

  const animationStyle = {
    borderRadius: containerStyle.borderRadius ?? 0,
    ...shadowStyle,
    ...animation,
  }

  const maskStyle = {
    borderRadius: containerStyle.borderRadius ?? 0,
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

export default PressableHOC;

