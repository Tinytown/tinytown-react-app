import functions from '@react-native-firebase/functions';
import {
  APP_STATE,
  APP_STORAGE,
  UPDATE_LOCATION,
  UPDATE_SETTING,
  UPDATE_ONBOARDING,
  SHOUTS_SETTING,
  SIGN_OUT,
} from './actionTypes';
import INITIAL_STATE from './initialState';
import { getMultiple, storeMultiple } from 'library/apis/storage';

export const appReducer = (state = null, action) => {
  switch (action.type) {
  case APP_STATE:
    return { ...state, active: action.payload };
  case APP_STORAGE:
    return { ...state, storageLoaded: action.payload };
  case UPDATE_SETTING:
    return { ...state,  settings: { ...action.payload } };
  case UPDATE_ONBOARDING:
    return { ...state,  onboarding: { ...action.payload } };
  case SIGN_OUT:
    return { ...state, settings: { ...INITIAL_STATE.app.settings }, onboarding: { ...INITIAL_STATE.app.onboarding } };
  default:
    return state;
  }
};

export const getStateFromLS = () => async (dispatch) => {
  const {
    userLocation,
    appSettings,
    shoutSettings,
  } = await getMultiple([
    'userLocation',
    'appSettings',
    'shoutSettings',
  ]);

  // Location
  if (userLocation) {
    const payload = {
      user: userLocation,
      hasPermission: true,
    };
    dispatch({ type: UPDATE_LOCATION, payload });
  }

  // App Settings
  if (appSettings) {
    dispatch({ type: UPDATE_SETTING, payload: appSettings });
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

  dispatch({ type: APP_STORAGE, payload: true });
};

export const storeStateToLS = () => (dispatch, getState) => {
  const { app: { settings: appSettings }, shouts: { settings: shoutSettings } } = getState();
  storeMultiple([
    ['appSettings', appSettings],
    ['shoutSettings', shoutSettings],
  ]);
};

export const updateAppState = (event) => {
  if (event === 'active') {
    return { type: APP_STATE, payload: true };
  } else if (event === 'background' || event === 'inactive') {
    return { type: APP_STATE, payload: false };
  }
};

export const updateAppSetting = (key, value) => async (dispatch, getState) => {
  const { app: { settings } } = getState();
  settings[key] = value;
  dispatch({ type: UPDATE_SETTING, payload: settings });
};

export const updateOnboarding = (key, value) => async (dispatch, getState) => {
  const { app: { onboarding } } = getState();
  onboarding[key] = value;
  dispatch({ type: UPDATE_ONBOARDING, payload: onboarding });
};
