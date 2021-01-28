import { APP_STATE, APP_STORAGE, UPDATE_LOCATION } from './actionTypes';
import { getData } from 'library/apis/storage';

export const appReducer = (state = null, action) => {
  switch (action.type) {
  case APP_STATE:
    return { ...state, active: action.payload };
  case APP_STORAGE:
    return { ...state, storageLoaded: action.payload };
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
