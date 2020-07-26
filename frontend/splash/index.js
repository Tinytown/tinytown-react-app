import React, {Component} from 'react';
import { Text, TouchableOpacity, Animated, Image, NativeModules, View, StyleSheet} from 'react-native';
import * as twitterApi from '../@@vendor/twitter';

export default class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      fadeAnim: new Animated.Value(0)
    };
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
  }

  twitterLogin = async () => {
    try {
      await twitterApi.login();
      this.setState({
        isLoggedIn: true
      });
    } catch(e) {
      return;
    }
  }

  render() {
    return (
      <View style={styles.landscape}>
        <Animated.View style={[ styles.fadingContainer, { opacity: this.state.fadeAnim }]}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <TouchableOpacity
            onPress={() =>
              this.twitterLogin().then(() =>
                console.log('Signed in with Twitter!')
              )}
          >
            <Text>
              Twitter Sign-In
            </Text>
        </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  landscape: {
    backgroundColor: 'black',
    height: '100%'
  },
  fadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain'
  }
});
