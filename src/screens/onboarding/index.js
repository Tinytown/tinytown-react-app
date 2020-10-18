import React from 'react';
import { View, StyleSheet, NativeModules } from 'react-native';
import * as twitterApi from 'library/utils/@@vendor/twitter';
import config from 'tinytown/config';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import Map from 'library/components/Map';
import FAB from 'library/components/fab';
import R from 'res/R';

const {RNTwitterSignIn} = NativeModules;

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLocated: false,
      isLoggedIn: false
    };
    
    RNTwitterSignIn.init('zPSC91qO9vkQvc5pdblqTdlnW', config.TWITTER_CONSUMER_SECRET);
  }

  twitterLogin = async () => {
    try {
      await twitterApi.login();
      this.setState({
        isLoggedIn: true
      });
    } catch(e) {
      throw e;
    }
  }

  render () {
    return (
      <View style={styles.landscape}>
        <Map></Map>
        <View style={styles.safeArea} pointerEvents='box-none'>
          <View style={styles.fabContainer}>
            { !this.state.isLocated && <FAB label={R.strings.button.gotoLocation} theme='green' icon='crosshairs' 
              onPress={() => this.setState({isLocated: true})}/> }
            { this.state.isLocated && <FAB label={R.strings.button.logIn} theme='blue' icon='twitter' 
              onPress={() => this.twitterLogin()
                .then(() => {
                  console.log('Signed in with Twitter!');
                })
                .catch(e => {
                  console.log(e.message);
                })
              }/> } 
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  landscape: {
    height: '100%'
  },
  safeArea: {
    position: 'absolute',
    width: '100%',
    bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    top: StaticSafeAreaInsets.safeAreaInsetsTop,
    alignItems: 'center'
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24
  }
});