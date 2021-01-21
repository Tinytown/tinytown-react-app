import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
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
  onLayout,
  children,
  ...props }) => {
  const [animation, animateOnPress]  = useAnimation(animationType);

  const animationStyle = {
    borderRadius: containerStyle?.borderRadius ?? 0,
    ...shadowStyle,
    ...animation,
  };

  const onPressInHandler = () => {
    animationType && animateOnPress('in');
    onPressIn();
  };

  const onPressOutHandler = () => {
    animationType && animateOnPress('out');
    onPressOut();
  };

  return (
    <Animated.View style={animationStyle} onLayout={onLayout}>
      <Ripple
        onPress={onPress}
        onPressIn={onPressInHandler}
        onPressOut={onPressOutHandler}
        disabled={props.disabled}
        style={containerStyle}
        rippleContainerBorderRadius={containerStyle?.borderRadius ?? 0}
        rippleColor={keyColor}
      >
        {children}
      </Ripple>
    </Animated.View>
  );
};

Pressable.propTypes = {
  animationType: PropTypes.string,
  containerStyle: PropTypes.object,
  shadowStyle: PropTypes.object,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Pressable;

