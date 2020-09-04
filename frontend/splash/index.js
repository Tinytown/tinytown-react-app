import React, {Component} from 'react';
import { Text, TouchableOpacity, Animated, Image, NativeModules, View, StyleSheet} from 'react-native';
import * as twitterApi from '../@@vendor/twitter';
import config from '../../config';

const {RNTwitterSignIn} = NativeModules;

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

    RNTwitterSignIn.init('wZPh7dfzEkEWNtxpuHaKZtCdt', config.TWITTER_CONSUMER_SECRET);
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
          
          <TouchableOpacity
            style={styles.twitterButton}
            onPress={() =>
              this.twitterLogin().then(() =>
                console.log('Signed in with Twitter!')
              )}
          >
            <Text style={styles.twitterButtonText}>
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
    backgroundColor: '#000000',
    height: '100%'
  },
  fadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  twitterButton: {
    backgroundColor: 'white',
    color: 'white',
    width: 200,
    height: 50
  },
  twitterButtonText: {
    textAlign: 'center',
    marginTop: 14
  }
});
