import { SIGN_IN, SIGN_OUT, UPDATE_LOCATION, APP_STATE, APP_LOAD, UPDATE_CAMERA } from './types';
import { getLocation } from '../../library/apis/geolocation'
import { clearStorage } from '../../library/apis/storage'

export const signIn = ({ photoURL, displayName, uid }) => { 
  return {
    type: SIGN_IN,
    payload: { photoURL, displayName, uid },
  };
};

export const signOut = () => {
  clearStorage()

  return {
    type: SIGN_OUT,
  };
};

export const getUserLocation = (onCamera = true) => {
  return async (dispatch) => {
    const onSuccess = (coords) => {
      const payload = {
        user: { 
          longitude: coords.longitude, 
          latitude: coords.latitude 
        },
        hasPermission: true,
      }
      dispatch({ type: UPDATE_LOCATION, payload: payload });
      dispatch({ type: UPDATE_CAMERA, payload: onCamera });
    }
    
    getLocation(onSuccess)
  };
};

export const updateUserLocation = (location) => {
 const payload = {
  user: { 
    longitude: location.user.longitude, 
    latitude: location.user.latitude 
  },
  hasPermission: true,
}
 return {
   type: UPDATE_LOCATION, payload
 }
}


export const setCamera = (value) => {
  return {
    type: UPDATE_CAMERA, payload: value
  };
};

export const updateAppState = (event) => {
  if (event === 'active') {
    return { type: APP_STATE, payload: true }
  } else if (event === 'background') {
    return { type: APP_STATE, payload: false }
  }
}

export const setLoaded = (state, value) => {
  const payload = {}
  payload[state] = value
  return {
    type: APP_LOAD, payload
  }
}
