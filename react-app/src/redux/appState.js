import { APP_STATE, APP_STORAGE, UPDATE_LOCATION, UPDATE_SETTING, UPDATE_ONBOARDING } from './actionTypes';
import { getData } from 'library/apis/storage';

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
  default:
    return state;
  }
};

export const getStateFromLS = () => async (dispatch) => {
  const coords = await getData('userLocation');
  if (coords) {
    const payload = {
      user: coords,
      hasPermission: true,
    };
    dispatch({ type: UPDATE_LOCATION, payload });
  }
  dispatch({ type: APP_STORAGE, payload: true });
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
  settings.[key] = value;
  dispatch({ type: UPDATE_SETTING, payload: settings });
};

export const updateOnboarding = (key, value) => async (dispatch, getState) => {
  const { app: { onboarding } } = getState();
  onboarding.[key] = value;
  dispatch({ type: UPDATE_ONBOARDING, payload: onboarding });
};
