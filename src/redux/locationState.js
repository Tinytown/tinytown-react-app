import { UPDATE_LOCATION, GO_TO_USER, USER_VISIBLE } from './actionTypes';

export const locationReducer = (state = null, action) => {
  switch (action.type) {
  case UPDATE_LOCATION:
    return {
      ...state,
      user: action.payload.user,
      hasPermission: action.payload.hasPermission,
      goToUser: action.payload.goToUser,
    };
  case GO_TO_USER:
    return {
      ...state,
      user: action.payload.user,
      hasPermission: action.payload.hasPermission,
      goToUser: true,
      userVisible: true };
  case USER_VISIBLE:
    return { ...state, userVisible: action.payload, goToUser: false };
  default:
    return state;
  }
};

export const goToUser = (location) => {
  const payload = {
    user: [location.longitude, location.latitude],
    hasPermission: true,
  };
  return { type: GO_TO_USER, payload };
};

export const updateUserLocation = (newLocation) => (dispatch, getState) => {
  const { location } = getState();
  const user = [newLocation.longitude, newLocation.latitude];
  const goToUser = location.user.every((val, index) => val == user[index]);

  const payload = {
    user,
    hasPermission: true,
    goToUser,
  };
  dispatch({ type: UPDATE_LOCATION, payload });
};

export const updateUserVisible = (payload) => {
  return { type: USER_VISIBLE, payload };
};
