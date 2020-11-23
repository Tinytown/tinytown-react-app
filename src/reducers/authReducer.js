import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: null,
  user: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isLoggedIn: true, user: action.payload };
    case SIGN_OUT:
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};
