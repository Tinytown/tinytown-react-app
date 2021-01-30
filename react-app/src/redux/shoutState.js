import functions from '@react-native-firebase/functions';
import { CREATE_SHOUT } from './actionTypes';

export const shoutReducer = (state = null, action) => {
  switch (action.type) {
  case CREATE_SHOUT:
    return { ...state, pending: [...state.pending, action.payload] };
  default:
    return state;
  }
};

export const createShout = (payload) => {
  functions().httpsCallable('createShout')(payload);
  return { type: CREATE_SHOUT, payload };
};
