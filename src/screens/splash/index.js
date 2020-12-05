import React, { Component } from 'react';
import { Text, TouchableOpacity, NativeModules, View } from 'react-native';
import * as twitterApi from 'library/utils/@@vendor/twitter';
import config from 'config/env.config.js';
import { create } from 'library/utils/normalize.js'
import RES from 'res';

const { RNTwitterSignIn } = NativeModules;

export default class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };

    RNTwitterSignIn.init(config.TWITTER_API_KEY, config.TWITTER_API_SECRET);
  }

  twitterLogin = async () => {
    try {
      await twitterApi.login();
      this.setState({
        isLoggedIn: true,
      });
    } catch (e) {
      throw e;
    }
  };

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
              .catch((e) => {
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

const styles = create({
  landscape: {
    backgroundColor: RES.COLORS.justWhite,
    height: '100%',
  },
  fadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  twitterButton: {
    backgroundColor: RES.COLORS.bubblegumRed600,
    borderRadius: RES.SHAPES.radiusAll,
    width: 200,
    height: 50,
    ...RES.SHAPES.elevRed5,
  },
  twitterButtonText: {
    textAlign: 'center',
    marginTop: 14,
    color: RES.COLORS.justWhite,
  },
});
