import { SIGN_IN, SIGN_OUT, UPDATE_LOCATION, APP_STATE, APP_LOAD, GO_TO_USER, USER_VISIBLE } from './types';
import { getLocation } from 'library/apis/geolocation';
import { clearStorage } from 'library/apis/storage';

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

export const getUserLocation = () => async (dispatch) => {
  const onSuccess = (coords) => {
    const payload = {
      user: coords,
      hasPermission: true,
    };
    dispatch({ type: UPDATE_LOCATION, payload });
    dispatch({ type: USER_VISIBLE, payload: true });
    dispatch({ type: GO_TO_USER });
  };

  getLocation(onSuccess);
};

export const updateUserLocation = (coords) => {
  const payload = {
    user: coords,
    hasPermission: true,
  };
  return { type: UPDATE_LOCATION, payload };
};

export const updateUserVisible = (payload) => {
  return { type: USER_VISIBLE, payload };
};

export const updateAppState = (event) => {
  if (event === 'active') {
    return { type: APP_STATE, payload: true };
  } else if (event === 'background' || event === 'inactive') {
    return { type: APP_STATE, payload: false };
  }
};

export const setLoaded = (key, value) => {
  return { type: APP_LOAD, payload: { key, value } };
};
