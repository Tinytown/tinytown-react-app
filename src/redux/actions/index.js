import { SIGN_IN, SIGN_OUT, GET_LOCATION, OFF_CAMERA, APP_STATE } from './types';
import { getLocationPermission, getLocation } from '../../library/apis/geolocation'

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

export const getUserLocation = (onCamera = true) => {
  return async (dispatch) => {
    const hasPermission = await getLocationPermission()

    if (!hasPermission) {
      return;
    }
    
    const onSuccess = (coords) => {
      const payload = {
        user: coords,
        onCamera,
        hasPermission,
      }
      dispatch({ type: GET_LOCATION, payload: payload });
    }
    
    getLocation(onSuccess)
  };
};

export const offCamera = () => {
  return {
    type: OFF_CAMERA,
  };
};

export const updateAppState = (event) => {
  return {
    type: APP_STATE, payload: event
  }
}

