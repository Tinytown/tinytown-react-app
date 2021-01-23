import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import Ripple from 'react-native-material-ripple';
import  { useAnimation }  from 'library/hooks';

const Pressable = ({
  animationType,
  containerStyle,
  shadowStyle,
  animationStyle,
  keyColor = 'white',
  onPress = () => console.log('Pass an onPress callback to this component'),
  onPressIn = () => {},
  onPressOut = () => {},
  onLayout = () => {},
  ripple = true,
  disabled,
  children,
}) => {
  const [animation, animateOnPress]  = useAnimation(animationType);

  const animationStyles = {
    borderRadius: containerStyle?.borderRadius ?? 0,
    ...shadowStyle,
    ...animationStyle,
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
    <Animated.View style={animationStyles} onLayout={onLayout}>
      <Ripple
        onPress={onPress}
        onPressIn={onPressInHandler}
        onPressOut={onPressOutHandler}
        disabled={disabled}
        style={containerStyle}
        rippleContainerBorderRadius={containerStyle?.borderRadius ?? 0}
        rippleColor={keyColor}
        rippleOpacity={ripple ? 0.3 : 0}
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
  animationStyle: PropTypes.object,
  keyColor: PropTypes.string,
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  onLayout: PropTypes.func,
  ripple: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.element,
};

export default Pressable;

