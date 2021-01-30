import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useAnimation } from 'library/hooks';

const Flippable = ({
  containerStyle,
  trigger,
  children,
}) => {
  const [frontAnimation, backAnimation] = useAnimation('flip', trigger);
  const touchableProps = {
    pointerEvents: trigger ? 'none' : 'auto',
  };

  return (
    <View
      style={containerStyle}
      pointerEvents='box-none'
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

export default React.memo(Flippable);
