import React from 'react'
import { Pressable, Animated, View } from 'react-native'
import { COLORS, getAnimationStyles } from 'res';

const PressableHOC = ({
  animationType,
  pressableStyle,
  containerStyle,
  shadowStyle,
  onPress,
  children,
  ...props }) => {
  const { animationStyle, handlePressIn, handlePressOut } = getAnimationStyles(containerStyle, animationType);

  return (
    <View style={shadowStyle} pointerEvents='box-none'>
      <Animated.View style={animationStyle}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={props.disabled}
          android_ripple={{ color: COLORS.steelGray }}
          style={pressableStyle}
        >
          {children}
        </Pressable>
      </Animated.View>
    </View>
  )
}

export default PressableHOC;

