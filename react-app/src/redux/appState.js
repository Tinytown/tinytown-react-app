import functions from '@react-native-firebase/functions';
import {
  APP_STATE,
  APP_STORAGE,
  UPDATE_LOCATION,
  SHOUTS_SETTING,
  SHOUTS_OPENED,
  SHOUTS_LOCAL,
  SIGN_IN,
} from './actionTypes';
import { getMultiple } from 'library/apis/storage';

export const appReducer = (state = null, action) => {
  switch (action.type) {
  case APP_STATE:
    return { ...state, state: action.payload };
  case APP_STORAGE:
    return { ...state, storageLoaded: action.payload };
  default:
    return state;
  }
};

export const getStateFromLS = () => async (dispatch) => {
  const {
    userLocation,
    user,
    shoutSettings,
    openedShouts,
    localShouts,
  } = await getMultiple([
    'userLocation',
    'user',
    'shoutSettings',
    'openedShouts',
    'localShouts',
  ]);

  // Location
  if (userLocation) {
    const payload = {
      user: userLocation,
      hasPermission: true,
    };
    dispatch({ type: UPDATE_LOCATION, payload });
  }

  // User info
  if (user) {
    dispatch({ type: SIGN_IN, payload: user });
  }

  // Shout Settings
  if (shoutSettings?.twitterGeo.enabled) {
    const { data: geoEnabled } = await functions().httpsCallable('checkTwitterGeo')();
    if (!geoEnabled) {
      shoutSettings.twitterGeo = { enabled: false, loading: false };
    }
  }

  if (shoutSettings) {
    dispatch({ type: SHOUTS_SETTING, payload: shoutSettings });
  }

  // Opened Shouts
  if (openedShouts) {
    dispatch({ type: SHOUTS_OPENED, payload: openedShouts });
  }

  // Local Shouts
  if (localShouts) {
    dispatch({ type: SHOUTS_LOCAL, payload: localShouts });
  }

  dispatch({ type: APP_STORAGE, payload: true });
};

export const updateAppState = (payload) => {
  return { type: APP_STATE, payload };
};
