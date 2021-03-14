import functions from '@react-native-firebase/functions';
import {
  SHOUTS_LOCAL,
  SHOUTS_SETTING,
  SHOUTS_OPENED,
  SHOUTS_NOTIFICATIONS,
  SIGN_OUT,
} from './actionTypes';
import INITIAL_STATE from './initialState';
import { storeData } from 'library/apis/storage';

export const shoutReducer = (state = null, action) => {
  switch (action.type) {
  case SHOUTS_LOCAL:
    return { ...state,  local: [...action.payload] };
  case SHOUTS_SETTING:
    return { ...state,  settings: { ...action.payload } };
  case SHOUTS_OPENED:
    return { ...state,  opened: [...action.payload]  };
  case SHOUTS_NOTIFICATIONS:
    return { ...state,  notifications: [...action.payload]  };
  case SIGN_OUT:
    return { ...INITIAL_STATE.shouts };
  default:
    return state;
  }
};

export const updateLocalShouts = (action, shout) => async (dispatch, getState) => {
  const { shouts: { local } } = getState();
  if (action === 'add') {
    if (__DEV__) {
      // simulate real-world delay
      setTimeout(() => {
        functions().httpsCallable('createShout')(shout);
      }, 2000);
    } else {
      // send to firestore
      functions().httpsCallable('createShout')(shout);
    }

    local.push({ ...shout, local: true, opened: true });
  } else if (action === 'remove') {
    objIndex = local.findIndex(({ localId }) => localId === shout.localId);
    local.splice(objIndex, 1);
  } else if (action === 'system_add') {
    local.push(shout);
  }
  storeData('localShouts', local);
  dispatch({ type: SHOUTS_LOCAL, payload: local });
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

export const updateSystemShout = (targetId, key, value) => async (dispatch, getState) => {
  const { shouts: { local } } = getState();
  objIndex = local.findIndex(({ id }) => id === targetId);
  local[objIndex][key] = value;
  storeData('localShouts', local);
  dispatch({ type: SHOUTS_LOCAL, payload: local });
};
