import { Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import { SIGN_IN, SIGN_OUT, UPDATE_AUTH } from './actionTypes';
import INITIAL_STATE from './initialState';
import { updateLocalShouts } from './shoutState';
import { clearStorage, storeData } from 'library/apis/storage';
import { getOnboardingShout } from 'library/components/Map/systemContent';
import { Settings } from 'context';

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

export const signIn = (token, secret) => async (dispatch, getState) => {
  const deviceId = DeviceInfo.getUniqueId();
  const twitterCredential = auth.TwitterAuthProvider.credential(token, secret);
  const { user } = await auth().signInWithCredential(twitterCredential);
  const { displayName, uid } = user;
  const photoURL = user.providerData[0].photoURL.replace(/_normal/i, '');
  storeData('user', { photoURL, displayName, uid });

  const userRef = firestore().collection('users')
    .doc(uid);
  const deviceRef = userRef.collection('devices').doc(deviceId);

  // store uid
  userRef.set({ uid });

  // store oauth tokens
  userRef
    .collection('oauth')
    .doc('twitter')
    .set({ token, secret });

  // create new doc for device in firestore
  deviceRef
    .set({
      deviceId,
      os: Platform.OS,
      settings: Settings.INITIAL_VALUE,
    });

  dispatch({
    type: SIGN_IN,
    payload: { photoURL, displayName, uid },
  });

  // add onboarding shout to local shouts
  const { location: { user: userLocation } } = getState();
  const shout = getOnboardingShout(userLocation);
  dispatch(updateLocalShouts('system_add', shout));
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
