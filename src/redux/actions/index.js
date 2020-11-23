import { SIGN_IN, SIGN_OUT } from './types';

export const signIn = ({ photoURL, displayName, uid }) => { 
  return {
    type: SIGN_IN,
    payload: { photoURL, displayName, uid },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};