import React from 'react'
import { Pressable, Animated, View, StyleSheet } from 'react-native'
import RES from 'res';

const PressableHOC = ({
  animationType,
  pressableStyle,
  containerStyle,
  shadowStyle,
  onPress,
  children,
  ...props }) => {
  const bounceValue = new Animated.Value(1);

  const getAnimationStyle = () => {
    const style = [containerStyle];

    switch (animationType) {
    case 'bounce':
      style.push({ transform: [{ scale: bounceValue }] });
    default:
      break;
    }

    return style;
  }

  const handlePressIn = () => {
    Animated.spring(bounceValue, {
      toValue: 0.93,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 3,
      tension: 120,
      useNativeDriver: true,
    }).start()
  }

  return (
    <View style={shadowStyle} pointerEvents='box-none'>
      <Animated.View style={getAnimationStyle()}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={props.disabled}
          android_ripple={{ color: RES.COLORS.steelGray }}
          style={pressableStyle}
        >
          {children}
        </Pressable>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({});

export default PressableHOC;

