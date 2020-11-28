import { UPDATE_CAMERA, SIGN_OUT, UPDATE_LOCATION, UPDATE_WATCHING } from '../actions/types';

const INITIAL_STATE = {
  user: {},
  onCamera: false,
  hasPermission: null,
  watching: false
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
      return { ...state, watching: action.payload };
    case UPDATE_CAMERA:
      return { ...state, onCamera: action.payload };
    case SIGN_OUT:
      return {...state, ...INITIAL_STATE }
    default:
      return state;
  }
};
