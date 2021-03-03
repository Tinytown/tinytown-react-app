import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import { SIGN_IN, SIGN_OUT, UPDATE_AUTH } from './actionTypes';
import INITIAL_STATE from './initialState';
import { clearStorage, storeData } from 'library/apis/storage';

export const authReducer = (state = null, action) => {
  switch (action.type) {
  case SIGN_IN:
    return { ...state, isSignedIn: true, user: action.payload };
  case SIGN_OUT:
    return { ...state, ...INITIAL_STATE.auth };
  case UPDATE_AUTH:
    return { ...state, isSignedIn: action.payload };
  default:
    return state;
  }
};

export const signIn = (token, secret) => async (dispatch) => {
  const deviceId = DeviceInfo.getUniqueId();
  const twitterCredential = auth.TwitterAuthProvider.credential(token, secret);
  const { user } = await auth().signInWithCredential(twitterCredential);
  const { displayName, uid } = user;
  const photoURL = user.providerData[0].photoURL.replace(/_normal/i, '');
  storeData('user', { photoURL, displayName, uid });

  // Store oauth tokens
  firestore().collection('users')
    .doc(uid)
    .collection('oauth')
    .doc('twitter')
    .set({ token, secret });

  // Create new doc for device in firestore
  firestore().collection('users')
    .doc(uid)
    .collection('devices')
    .doc(deviceId)
    .set({ deviceId });

  dispatch({
    type: SIGN_IN,
    payload: { photoURL, displayName, uid },
  });
};

export const signOut = () => async (dispatch) => {
  const deviceId = DeviceInfo.getUniqueId();
  const { uid } = auth().currentUser;

  try {
    functions().httpsCallable('signOut')({ deviceId, uid });
    await auth().signOut();
    await clearStorage();
    dispatch({ type: SIGN_OUT });
  } catch (error) {
    console.log(error);
  }
};

export const updateAuth = (user) => (dispatch) => {
  if (user) {
    dispatch({ type: UPDATE_AUTH, payload: true });
  } else {
    dispatch({ type: UPDATE_AUTH, payload: false });
  }
};
