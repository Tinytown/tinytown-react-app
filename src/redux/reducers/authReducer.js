import { SIGN_IN, SIGN_OUT } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, user: action.payload };
    case SIGN_OUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
