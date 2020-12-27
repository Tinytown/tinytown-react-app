import { UPDATE_LOCATION, GO_TO_USER, USER_VISIBLE } from 'rdx/actions/types';

export default (state = null, action) => {
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
