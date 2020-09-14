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
    };

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  landscape: {
    backgroundColor: '#000000',
    height: '100%',
    alignItems: 'center',	
    justifyContent: 'center'
  },
  twitterButton: {
    backgroundColor: 'gray',
    color: 'white',
    width: 200,
    height: 50
  },
  twitterButtonText: {
    textAlign: 'center',
    marginTop: 14
  }
});
