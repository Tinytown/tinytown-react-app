import React, {Component} from 'react';
import { Text, TouchableOpacity, Animated, Image, NativeModules, View, StyleSheet} from 'react-native';
import * as twitterApi from '../@@vendor/twitter';
import config from '../../config';
import { colors, shapes } from '../styles'


const {RNTwitterSignIn} = NativeModules;

export default class Splash extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
    };

    this.twitterInitialization = RNTwitterSignIn.init('zPSC91qO9vkQvc5pdblqTdlnW', config.TWITTER_CONSUMER_SECRET);
  }

  twitterLogin = async () => {
    try {
      console.log(this.twitterInitialization);
      const x = await this.twitterInitialization;
      console.log('x: ', x)
      await twitterApi.login();
      this.setState({
        isLoggedIn: true
      });
    } catch(e) {
      throw e;
    }
  }

  render() {
    return (
      <View style={styles.landscape}>
          <TouchableOpacity
            style={styles.twitterButton}
            onPress={() =>
              this.twitterLogin()
                .then(() => {
                  console.log('Signed in with Twitter!');
                })
                .catch(e => {
                  console.log(e.message);
                })
            }
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
    backgroundColor: colors.justWhite,
    height: '100%'
  },
  fadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  twitterButton: {
    backgroundColor: colors.bubblegumRed600,
    borderRadius: shapes.allRadius,
    width: 200,
    height: 50,
    ...shapes.elevRed5,
  },
  twitterButtonText: {
    textAlign: 'center',
    marginTop: 14,
    color: colors.justWhite
  }
});
