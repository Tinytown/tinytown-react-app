import { SIGN_IN, SIGN_OUT } from '../actions/types';
import INITIAL_STATE from '../initialState'

export default (state = null, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, user: action.payload };
    case SIGN_OUT:
      return { ...state, ...INITIAL_STATE.auth };
    default:
      return state;
  }
};
