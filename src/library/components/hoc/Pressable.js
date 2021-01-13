import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types';
import Ripple from 'react-native-material-ripple';
import { animated } from 'react-spring'
import { getAnimationStyles } from 'res';

const Pressable = ({
  animationType,
  containerStyle,
  shadowStyle,
  onPress = () => console.log('Pass an onPress callback to this component'),
  children,
  ...props }) => {
  const [animation, handlePressIn, handlePressOut]  = getAnimationStyles(animationType);
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
        <Ripple
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={props.disabled}
          style={containerStyle}
        >
          {children}
        </Ripple>
      </View>
    </AnimatedView>
  )
}

Pressable.propTypes = {
  animationType: PropTypes.string,
  containerStyle: PropTypes.object,
  shadowStyle: PropTypes.object,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Pressable;

