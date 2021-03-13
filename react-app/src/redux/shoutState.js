import functions from '@react-native-firebase/functions';
import {
  SHOUTS_LOCAL,
  SHOUTS_LOADING,
  SHOUTS_SETTING,
  SHOUTS_OPENED,
  SHOUTS_NOTIFICATIONS,
  UPDATE_ONBOARDING,
  SIGN_OUT,
} from './actionTypes';
import INITIAL_STATE from './initialState';
import { storeData } from 'library/apis/storage';

export const shoutReducer = (state = null, action) => {
  switch (action.type) {
  case SHOUTS_LOCAL:
    return { ...state,  local: [...action.payload] };
  case SHOUTS_LOADING:
    return { ...state,  loading: action.payload };
  case SHOUTS_SETTING:
    return { ...state,  settings: { ...action.payload } };
  case SHOUTS_OPENED:
    return { ...state,  opened: [...action.payload]  };
  case SHOUTS_NOTIFICATIONS:
    return { ...state,  notifications: [...action.payload]  };
  case UPDATE_ONBOARDING:
    return { ...state,  onboarding: { ...action.payload } };
  case SIGN_OUT:
    return { ...INITIAL_STATE.shouts };
  default:
    return state;
  }
};

export const updateLocalShouts = (action, shout) => async (dispatch, getState) => {
  const { shouts: { local } } = getState();
  if (action === 'add') {
    // send to firestore
    shout.localId = Math.floor(Math.random() * 1000);
    functions().httpsCallable('createShout')(shout);

    shout.local = true;
    local.push(shout);
  } else if (action === 'remove') {
    objIndex = local.findIndex(({ localId }) => localId === shout.localId);
    local.splice(objIndex, 1);
  }
  storeData('localShouts', local);
  dispatch({ type: SHOUTS_LOCAL, payload: local });
};

export const updateShoutsLoading = (payload) => {
  return { type: SHOUTS_LOADING, payload };
};

export const updateShoutsSetting = (key, value) => async (dispatch, getState) => {
  const { shouts: { settings } } = getState();
  settings[key] = value;
  storeData('shoutSettings', settings);
  dispatch({ type: SHOUTS_SETTING, payload: settings });
};

export const updateOpenedShouts = (action, shoutId) => async (dispatch, getState) => {
  const { shouts: { opened } } = getState();
  if (action === 'add') {
    opened.push(shoutId);
  } else if (action === 'remove') {
    objIndex = opened.findIndex((id) => id === shoutId);
    opened.splice(objIndex, 1);
  }
  storeData('openedShouts', opened);
  dispatch({ type: SHOUTS_OPENED, payload: opened });
};

export const updateNotificationShouts = (action, shout) => async (dispatch, getState) => {
  const { shouts: { notifications } } = getState();
  if (action === 'add') {
    notifications.push(shout);
  } else if (action === 'remove') {
    objIndex = notifications.findIndex(({ id }) => id === shout.id);
    notifications.splice(objIndex, 1);
  }
  dispatch({ type: SHOUTS_NOTIFICATIONS, payload: notifications });
};

export const updateSystemShout = (tag, key, value) => async (dispatch, getState) => {
  const { shouts: { local } } = getState();
  objIndex = local.findIndex(({ systemTag }) => systemTag === tag);
  local[objIndex][key] = value;

  dispatch({ type: SHOUTS_LOCAL, payload: local });
};
