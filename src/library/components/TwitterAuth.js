import React, { useEffect } from 'react';
import { NativeModules } from 'react-native';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';
import config from 'config/env.config.js';
import FAB from './FAB';
import { STRINGS } from 'res';

const TwitterAuth = ({ onLoading }) => {
  const { RNTwitterSignIn } = NativeModules;

  useEffect(() => {
    RNTwitterSignIn.init(config.TWITTER_API_KEY, config.TWITTER_API_SECRET)
      .then(() => console.log('Twitter SDK initialized'))
      .catch((err) => console.log(err));
  }, []);

  const onLogInPress = async () => {
    try {
      const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
      onLoading(true);
      const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
      auth().signInWithCredential(twitterCredential);
    } catch (err) {
      onLoading(false);
      console.log(err);
    }
  };

  return <FAB onPress={onLogInPress} label={STRINGS.button.logIn} theme='blue' icon='twitter' />;
};

TwitterAuth.propTypes = {
  onLoading: PropTypes.func,
};

TwitterAuth.defaultProps = {
  onLoading: () => console.log('Pass an onLoading callback to this component'),
};

export default TwitterAuth;
