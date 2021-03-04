import functions from '@react-native-firebase/functions';
import { LOCAL_SHOUTS, SHOUTS_LOADING, SHOUTS_SETTING, SHOUTS_OPENED, SHOUTS_NOTIFICATIONS } from './actionTypes';

export const shoutReducer = (state = null, action) => {
  switch (action.type) {
  case LOCAL_SHOUTS:
    return { ...state,  local: [...action.payload] };
  case SHOUTS_LOADING:
    return { ...state,  loading: action.payload };
  case SHOUTS_SETTING:
    return { ...state,  settings: { ...action.payload } };
  case SHOUTS_OPENED:
    return { ...state,  opened: [...action.payload]  };
  case SHOUTS_NOTIFICATIONS:
    return { ...state,  notifications: [...action.payload]  };
  default:
    return state;
  }
};

export const createShout = (shout) => async (dispatch, getState) => {
  const { shouts: { local } } = getState();
  shout.localId = Math.floor(Math.random() * 1000);
  shout.local = true;
  local.push(shout);

  dispatch({ type: LOCAL_SHOUTS, payload: local });

  // add shout Id when successfully uploaded
  functions().httpsCallable('createShout')(shout);
};

export const removeLocalShout = (localId) => async (dispatch, getState) => {
  const { shouts: { local } } = getState();
  const filteredShouts = local.filter((shout) => shout.localId !== localId);

  dispatch({ type: LOCAL_SHOUTS, payload: filteredShouts });
};

export const updateShoutsLoading = (payload) => {
  return { type: SHOUTS_LOADING, payload };
};

export const updateShoutsSetting = (key, value) => async (dispatch, getState) => {
  const { shouts: { settings } } = getState();
  settings[key] = value;
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
  dispatch({ type: SHOUTS_OPENED, payload: opened });
};

export const updateNotificationShouts = (action, shoutId) => async (dispatch, getState) => {
  const { shouts: { notifications } } = getState();
  if (action === 'add') {
    notifications.push(shoutId);
  } else if (action === 'remove') {
    objIndex = notifications.findIndex((id) => id === shoutId);
    notifications.splice(objIndex, 1);
  }
  dispatch({ type: SHOUTS_NOTIFICATIONS, payload: notifications });
};
