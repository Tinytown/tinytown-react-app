import auth from '@react-native-firebase/auth';
import {NativeModules} from 'react-native';
import config from '../../../config';

const {RNTwitterSignIn} = NativeModules;

export async function login() {
  try {
    await RNTwitterSignIn.init(config.TWITTER_CONSUMER_KEY, config.TWITTER_CONSUMER_SECRET);

    const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();

    const credential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

    return auth().signInWithCredential(credential);
  } catch (e) {
    throw new Error('Failed to login to twitter');
  }
}
