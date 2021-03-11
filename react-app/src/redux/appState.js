import functions from '@react-native-firebase/functions';
import {
  APP_STATE,
  APP_STORAGE,
  UPDATE_LOCATION,
  UPDATE_ONBOARDING,
  SHOUTS_SETTING,
  SHOUTS_OPENED,
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
    shoutOnboarding,
    openedShouts,
  } = await getMultiple([
    'userLocation',
    'user',
    'shoutSettings',
    'shoutOnboarding',
    'openedShouts',
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

  // Shout Onboarding
  if (shoutOnboarding) {
    dispatch({ type: UPDATE_ONBOARDING, payload: shoutOnboarding });
  }

  // Opened Shouts
  if (openedShouts) {
    dispatch({ type: SHOUTS_OPENED, payload: openedShouts });
  }

  dispatch({ type: APP_STORAGE, payload: true });
};

export const updateAppState = (payload) => {
  return { type: APP_STATE, payload };
};
