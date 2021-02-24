import React, { useEffect, useContext } from 'react';
import { NativeModules } from 'react-native';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import { Config } from 'context';
import FAB from './FAB';

const TwitterAuth = ({ onLoading }) => {
  const { RNTwitterSignIn } = NativeModules;
  const { ENV, STRINGS } = useContext(Config.Context);

  useEffect(() => {
    RNTwitterSignIn.init(ENV.TWITTER_API_KEY, ENV.TWITTER_API_SECRET)
      .then(() => console.log('Twitter SDK initialized'))
      .catch((err) => console.log(err));
  }, []);

  const onLogInPress = async () => {
    try {
      const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
      onLoading(true);
      const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
      await auth().signInWithCredential(twitterCredential);
      functions().httpsCallable('storeOauthTokens')(twitterCredential);
    } catch (err) {
      onLoading(false);
      console.log(err);
    }
  };

  return (
    <FAB
      label={STRINGS.auth.logIn}
      theme='red'
      icon='twitter'
      onPress={onLogInPress}
    />
  );
};

TwitterAuth.propTypes = {
  onLoading: PropTypes.func,
};

TwitterAuth.defaultProps = {
  onLoading: () => console.log('Pass an onLoading callback to this component'),
};

export default TwitterAuth;
