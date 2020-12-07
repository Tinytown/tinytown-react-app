import { SIGN_OUT, UPDATE_LOCATION, UPDATE_WATCHING, GO_TO_USER, USER_VISIBLE } from '../actions/types';

const INITIAL_STATE = {
  user: null,
  hasPermission: false,
  watchingLocation: false,
  goToUser: false,
  userVisible: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return { 
        ...state, 
        user: action.payload.user,
        hasPermission: action.payload.hasPermission 
      };
    case UPDATE_WATCHING:
      return { ...state, watchingLocation: action.payload };
    case GO_TO_USER:
      return { ...state, goToUser: true };
    case USER_VISIBLE:
      return {...state, userVisible: action.payload, goToUser: false}
    case SIGN_OUT:
      return {
        ...state,
        hasPermission: false,
        watchingLocation: false,
        goToUser: false,
        userVisible: false, }
    default:
      return state;
  }
};
