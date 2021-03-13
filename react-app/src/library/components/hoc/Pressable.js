import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import Ripple from 'react-native-material-ripple';
import  { useAnimation }  from 'library/hooks';
import { COLORS  } from 'res';

const Pressable = ({
  animationType,
  containerStyle,
  shadowStyle,
  animationStyle,
  rippleColor = COLORS.asphaltGray[800],
  ripple = true,
  disabled = false,
  onPress = () => console.log('Pass an onPress callback to this component'),
  onPressIn = () => {},
  onPressOut = () => {},
  onLayout = () => {},
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
        rippleColor={rippleColor}
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
  rippleColor: PropTypes.string,
  ripple: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  onLayout: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default Pressable;

