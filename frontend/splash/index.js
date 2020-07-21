import React, {Component} from 'react';
import {
  Animated,
  Button,
  Image,
  NativeModules,
  View,
  StyleSheet,
} from 'react-native';
import onTwitterButtonPress from '../TwitterButtonPress';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    const {RNTwitterSignIn} = NativeModules;

    RNTwitterSignIn.init(
      'g5UbOn4fKvDHN7U5IRs0qPGFR',
      'Tq10F4Ekm7EsYZMwGfAJ89pmxw7cGYSznewQN4kQ1ic0bvYVMa',
    ).then(() => console.log('Twitter SDK initialized'));

    this.state = {
      fadeAnim: new Animated.Value(0),
    };
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <View style={styles.landscape}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: this.state.fadeAnim,
            },
          ]}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        </Animated.View>
        <Button
          title="Twitter Sign-In"
          onPress={() =>
            onTwitterButtonPress().then(() =>
              console.log('Signed in with Twitter!'),
            )
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  landscape: {
    backgroundColor: 'black',
    height: '100%',
  },
  fadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain',
  },
});
