import { SIGN_OUT, UPDATE_LOCATION, UPDATE_WATCHING, GO_TO_USER, USER_VISIBLE } from 'rdx/actions/types';

export default (state = null, action) => {
  switch (action.type) {
  case UPDATE_LOCATION:
    return {
      ...state,
      user: action.payload.user,
      hasPermission: action.payload.hasPermission,
    };
  case UPDATE_WATCHING:
    return { ...state, watchingLocation: action.payload };
  case GO_TO_USER:
    return { ...state, goToUser: true };
  case USER_VISIBLE:
    return { ...state, userVisible: action.payload, goToUser: false };
  case SIGN_OUT:
    return {
      ...state,
      hasPermission: false,
      watchingLocation: false,
      goToUser: false,
      userVisible: false };
  default:
    return state;
  }
};
