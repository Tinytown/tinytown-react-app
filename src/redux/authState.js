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

export const signIn = ({ photoURL, displayName, uid }) => {
  return {
    type: SIGN_IN,
    payload: { photoURL, displayName, uid },
  };
};

export const signOut = () => {
  clearStorage();
  return { type: SIGN_OUT };
};

export const updateAuth = (payload) => {
  return { type: UPDATE_AUTH, payload };
};