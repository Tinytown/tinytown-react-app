import functions from '@react-native-firebase/functions';
import { LOCAL_SHOUTS, SHOUTS_LOADING, SHOUTS_SETTING, SHOUTS_OPENED } from './actionTypes';

export const shoutReducer = (state = null, action) => {
  switch (action.type) {
  case LOCAL_SHOUTS:
    return { ...state,  local: action.payload };
  case SHOUTS_LOADING:
    return { ...state,  loading: action.payload };
  case SHOUTS_SETTING:
    return { ...state,  settings: { ...action.payload } };
  case SHOUTS_OPENED:
    return { ...state,  opened: action.payload  };
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

export const removeShout = (remoteShout) => async (dispatch, getState) => {
  const { shouts: { local } } = getState();
  const filteredShouts = local.filter((shout) => shout.localId !== remoteShout.localId);

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
    objIndex = opened.findIndex(({ id }) => id === shoutId);
    console.log(objIndex);
  }
  dispatch({ type: SHOUTS_OPENED, payload: opened });
};
