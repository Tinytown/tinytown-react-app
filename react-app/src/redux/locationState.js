import functions from '@react-native-firebase/functions';
import DeviceInfo from 'react-native-device-info';
import { UPDATE_LOCATION, GO_TO_USER, USER_VISIBLE } from './actionTypes';

export const locationReducer = (state = null, action) => {
  switch (action.type) {
  case UPDATE_LOCATION:
    return {
      ...state,
      user: action.payload.user,
      hasPermission: action.payload.hasPermission,
      goToUser: false,
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

export const updateUserLocation = ({ longitude, latitude }) => (dispatch, getState) => {
  const { location, app: { settings: { notifications } } } = getState();
  const coordinates = [longitude, latitude];
  const sameLocation = location.user.every((val, index) => val == coordinates[index]);

  if (sameLocation) {
    return;
  }

  if (notifications) {
  // Store location in firestore
    const deviceId = DeviceInfo.getUniqueId();
    functions().httpsCallable('storeLocation')({ deviceId, coordinates });
  }

  const payload = {
    user: coordinates,
    hasPermission: true,
  };
  dispatch({ type: UPDATE_LOCATION, payload });
};

export const updateUserVisible = (payload) => (
  { type: USER_VISIBLE, payload }
);
