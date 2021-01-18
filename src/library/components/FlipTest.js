import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated';
import { STRINGS, normalizeStyles } from 'res';
import FAB from '../components/FAB'
import { useAnimation } from 'library/hooks';

const FlipTest = () => {
  const [frontAnimation, backAnimation, flip, setFlip] = useAnimation('flip');
  const touchableProps = {
    pointerEvents: flip ? 'none' : 'auto',
  }

  return (
    <View style={styles.flipContainer} >
      <Animated.View style={backAnimation} >
        <FAB label={STRINGS.button.gotoLocation} theme='green' icon='crosshairs' onPress={() => setFlip(false)}/>
      </Animated.View>
      <Animated.View style={frontAnimation} {...touchableProps} >
        <FAB label='Log in with Twitter' theme='blue' icon='twitter' onPress={() => setFlip(true)}/>
      </Animated.View>
    </View>
  )
}

const styles = normalizeStyles({
  flipContainer: {
    position: 'absolute',
    bottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FlipTest
