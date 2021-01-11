import React from 'react'
import { Pressable, Animated, View } from 'react-native'
import { COLORS, getAnimationStyles } from 'res';

const PressableHOC = ({
  animationType,
  containerStyle,
  shadowStyle,
  onPress,
  children,
  ...props }) => {
  const { animation, handlePressIn, handlePressOut } = getAnimationStyles(animationType);

  const animationStyle = {
    overflow: 'hidden',
    borderRadius: containerStyle.borderRadius ?? 0,
    ...animation,
  }

  return (
    <View style={shadowStyle} pointerEvents='box-none'>
      <Animated.View style={animationStyle}>
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
      </Animated.View>
    </View>
  )
}

export default PressableHOC;

