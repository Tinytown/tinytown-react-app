import { SIGN_IN, SIGN_OUT, UPDATE_AUTH } from 'rdx/actions/types';
import INITIAL_STATE from 'rdx/initialState';

export default (state = null, action) => {
  switch (action.type) {
  case SIGN_IN:
    return { ...state, isSignedIn: true, user: action.payload };
  case SIGN_OUT:
    return { ...state, ...INITIAL_STATE.auth };
  case UPDATE_AUTH:
    return { ...state, isSignedIn: action.payload };
  default:
    return state;
  }
};
