import { SIGN_IN, SIGN_OUT, UPDATE_AUTH } from './actionTypes';
import INITIAL_STATE from './initialState';
import { clearStorage } from 'library/apis/storage';

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

export const signIn = (user) => {
  const { displayName, uid } = user;
  const photoURL = user.providerData[0].photoURL.replace(/_normal/i, '');

  return {
    type: SIGN_IN,
    payload: { photoURL, displayName, uid },
  };
};

export const signOut = () => async (dispatch) => {
  await clearStorage();
  dispatch({ type: SIGN_OUT });
};

export const updateAuth = (payload) => (
  { type: UPDATE_AUTH, payload }
);
