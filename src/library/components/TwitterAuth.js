import React, { useEffect } from 'react'
import { NativeModules } from 'react-native';
import config from 'tinytown/config';
import auth from '@react-native-firebase/auth';
const { RNTwitterSignIn } = NativeModules;
import { connect } from 'react-redux';
import { signIn } from '../../redux/actions';
import FAB from 'library/components/fab';
import R from 'res/R';

const TwitterAuth = (props) => {
  useEffect(() => {
    // Initialize the Twitter SDK
    RNTwitterSignIn.init(config.TWITTER_CONSUMER_KEY, config.TWITTER_CONSUMER_SECRET)
      .then(() => console.log('Twitter SDK initialized'))
      .catch(err => console.log(err))
  }, [])
  
  const onLogInPress = async () => {
    try {
      // Perform the login request
      const {authToken, authTokenSecret} = await RNTwitterSignIn.logIn();
      // Shows activity indicator
      props.onLoading(true)
      // Create a Twitter credential with the tokens
      const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
      // Sign-in the user with the credential
      auth().signInWithCredential(twitterCredential);
      // Update redux store
      auth().onAuthStateChanged((user) => user ? props.signIn(user) : null)
    } catch(err) {
      props.onLoading(false)
      console.log(err)
    }
  }
  
  return (
      <FAB onPress={onLogInPress} label={R.strings.button.logIn} theme='blue' icon='twitter' />
  )
}

export default connect(null, { signIn })(TwitterAuth)
