import functions from '@react-native-firebase/functions';
import { UPDATE_SHOUTS, SHOUTS_LOADING } from './actionTypes';

export const shoutReducer = (state = null, action) => {
  switch (action.type) {
  case UPDATE_SHOUTS:
    return { ...state,  created: [...action.payload] };
  case SHOUTS_LOADING:
    return { ...state,  loading: action.payload };
  default:
    return state;
  }
};

export const createShout = (shout) => async (dispatch, getState) => {
  const { shouts: { created } } = getState();
  shout.tempId = Math.floor(Math.random() * 1000);
  shout.created = true;
  created.push(shout);

  dispatch({ type: UPDATE_SHOUTS, payload: created });

  // Add shout Id when successfully uploaded
  const { data: { shoutId } } = await functions().httpsCallable('createShout')(shout);

  if (shoutId) {
    created[created.length - 1] = { ...shout, id: shoutId };
    dispatch({ type: UPDATE_SHOUTS, payload: created });
  }
};

export const removeShout = (shoutId) => async (dispatch, getState) => {
  const { shouts: { created } } = getState();
  const shoutToRemove = created.find((shout) => shout.id === shoutId);

  if (shoutToRemove) {
    const filteredShouts = created.filter((shout) => shout.id !== shoutId);
    dispatch({ type: UPDATE_SHOUTS, payload: filteredShouts });
  }
};

export const updateShoutsLoading = (payload) => {
  return { type: SHOUTS_LOADING, payload };
};

