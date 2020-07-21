import auth from '@react-native-firebase/auth';
import {NativeModules} from 'react-native';
const {RNTwitterSignIn} = NativeModules;

export async function onTwitterButtonPress() {
  // Perform the login request
  const {authToken, authTokenSecret} = await RNTwitterSignIn.logIn();

  // Create a Twitter credential with the tokens
  const twitterCredential = auth.TwitterAuthProvider.credential(
    authToken,
    authTokenSecret,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(twitterCredential);
}
