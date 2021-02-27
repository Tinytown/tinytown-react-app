import functions from '@react-native-firebase/functions';
import { UPDATE_SHOUTS, SHOUTS_LOADING } from './actionTypes';

export const shoutReducer = (state = null, action) => {
  switch (action.type) {
  case UPDATE_SHOUTS:
    return { ...state,  local: [...action.payload] };
  case SHOUTS_LOADING:
    return { ...state,  loading: action.payload };
  default:
    return state;
  }
};

export const createShout = (shout) => async (dispatch, getState) => {
  const { shouts: { local } } = getState();
  shout.localId = Math.floor(Math.random() * 1000);
  shout.local = true;
  local.push(shout);

  dispatch({ type: UPDATE_SHOUTS, payload: local });

  // Add shout Id when successfully uploaded
  functions().httpsCallable('createShout')(shout);
};

export const removeShout = (remoteShout) => async (dispatch, getState) => {
  const { shouts: { local } } = getState();
  const filteredShouts = local.filter((shout) => shout.localId !== remoteShout.localId);

  dispatch({ type: UPDATE_SHOUTS, payload: filteredShouts });
};

export const updateShoutsLoading = (payload) => {
  return { type: SHOUTS_LOADING, payload };
};

