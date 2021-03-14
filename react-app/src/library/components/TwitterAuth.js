import React, { useEffect, useContext } from 'react';
import { NativeModules } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from 'rdx/authState';
import { Config } from 'context';
import FAB from './FAB';

const TwitterAuth = ({ setAuthLoading, signIn }) => {
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
      setAuthLoading(true);
      signIn(authToken, authTokenSecret);
    } catch (err) {
      setAuthLoading(false);
      console.log(err);
    }
  };

  return (
    <FAB
      label={STRINGS.auth.logIn}
      theme='lt-red-floating'
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

export default connect(null, { signIn })(TwitterAuth);
