import { CREATE_SHOUT } from './actionTypes';

export const shoutReducer = (state = null, action) => {
  switch (action.type) {
  case CREATE_SHOUT:
    return { ...state, pending: action.payload };
  default:
    return state;
  }
};

export const createShout = (payload) => {
  // TODO send shout to firebase

  return { type: CREATE_SHOUT, payload };
};
