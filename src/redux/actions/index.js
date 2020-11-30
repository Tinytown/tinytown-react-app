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

export const getUserLocation = () => {
  return async (dispatch) => {
    const onSuccess = (coords) => {
      const payload = {
        user: coords,
        hasPermission: true,
      }
      dispatch({ type: UPDATE_LOCATION, payload });
      dispatch({ 
        type: UPDATE_CAMERA, 
        payload: { 
          center: coords, 
          zoom: 12, 
          onUser: true, 
          isUserInteraction: false, 
      }});
    }
    
    getLocation(onSuccess)
  };
};

export const updateUserLocation = (coords) => {
 const payload = {
  user: coords,
  hasPermission: true,
}
 return {
   type: UPDATE_LOCATION, payload
 }
}

export const setCamera = (center, zoom, onUser = false) => {
  const payload = {
    center,
    zoom,
    onUser,
    isUserInteraction: true
  }
  return {
    type: UPDATE_CAMERA, payload
  };
};

export const updateAppState = (event) => {
  if (event === 'active') {
    return { type: APP_STATE, payload: true }
  } else if (event === 'background' || event === 'inactive') {
    return { type: APP_STATE, payload: false }
  }
}

export const setLoaded = (key, value) => {
  const payload = {
    key,
    value
  }
  return {
    type: APP_LOAD, payload
  }
}
