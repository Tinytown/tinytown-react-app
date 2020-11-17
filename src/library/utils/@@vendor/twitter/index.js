import auth from '@react-native-firebase/auth';
import { NativeModules } from 'react-native';

const { RNTwitterSignIn } = NativeModules;

export async function login() {
  try {
    console.log('RNTwitterSignIn: ', RNTwitterSignIn);
    const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();
    const credential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

    return auth().signInWithCredential(credential);
  } catch (e) {
    throw new Error('Failed to login to twitter');
  }
}
