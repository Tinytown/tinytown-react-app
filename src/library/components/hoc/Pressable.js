import React from 'react'
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated'
import Ripple from 'react-native-material-ripple';
import  { useAnimation }  from 'library/hooks';

const Pressable = ({
  animationType,
  containerStyle,
  shadowStyle,
  keyColor = 'white',
  onPress = () => console.log('Pass an onPress callback to this component'),
  onPressIn = () => {},
  onPressOut = () => {},
  children,
  ...props }) => {
  const [animation, animateOnPress]  = useAnimation(animationType);

  const animationStyle = {
    borderRadius: containerStyle?.borderRadius ?? 0,
    ...shadowStyle,
    ...animation,
  }

  const handleOnPressIn = () => {
    animationType && animateOnPress('in');
    onPressIn();
  };

  const handleOnPressOut = () => {
    animationType && animateOnPress('out');
    onPressOut();
  };

  return (
    <Animated.View style={animationStyle} pointerEvents='box-none' >
      <Ripple
        onPress={onPress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
        disabled={props.disabled}
        style={containerStyle}
        rippleContainerBorderRadius={containerStyle?.borderRadius ?? 0}
        rippleColor={keyColor}
      >
        {children}
      </Ripple>
    </Animated.View>
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

