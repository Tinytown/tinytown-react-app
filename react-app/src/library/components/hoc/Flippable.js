import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { useAnimation } from 'library/hooks';

const Flippable = ({
  containerStyle,
  trigger,
  children,
  onTouchStart = () => {},
}) => {
  const [frontAnimation, backAnimation] = useAnimation('flip', trigger);
  const touchableProps = {
    pointerEvents: trigger ? 'none' : 'auto',
  };

  return (
    <View
      style={containerStyle}
      pointerEvents='box-none'
      onTouchStart={onTouchStart}
    >
      <Animated.View style={backAnimation} >
        {children[0]}
      </Animated.View>
      <Animated.View style={frontAnimation} {...touchableProps} >
        {children[1]}
      </Animated.View>
    </View>
  );
};

Flippable.propTypes = {
  onTouchStart: PropTypes.func,
};

export default React.memo(Flippable);
