import React, {Component} from 'react';
import { Text, TouchableOpacity, NativeModules, View, StyleSheet} from 'react-native';
import * as twitterApi from 'library/utils/@@vendor/twitter';
import config from 'tinytown/config';
import R from 'res/R';


const {RNTwitterSignIn} = NativeModules;

export default class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
    
    RNTwitterSignIn.init('zPSC91qO9vkQvc5pdblqTdlnW', config.TWITTER_CONSUMER_SECRET);
  }

  twitterLogin = async () => {
    try {
      await twitterApi.login();
      this.setState({
        isLoggedIn: true,
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

const styles = StyleSheet.create({
  landscape: {
    backgroundColor: R.colors.justWhite,
    height: '100%',
  },
  fadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  twitterButton: {
    backgroundColor: R.colors.bubblegumRed600,
    borderRadius: R.shapes.radiusAll,
    width: 200,
    height: 50,
    ...R.shapes.elevRed5,
  },
  twitterButtonText: {
    textAlign: 'center',
    marginTop: 14,
    color: R.colors.justWhite,
  },
});
