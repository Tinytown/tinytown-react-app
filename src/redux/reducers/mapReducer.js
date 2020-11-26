import { GET_LOCATION, OFF_CAMERA, SIGN_OUT, UPDATE_LOCATION, UPDATE_WATCHING } from '../actions/types';

const INITIAL_STATE = {
  user: {},
  onCamera: false,
  hasPermission: null,
  watching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return { 
        ...state, 
        user: action.payload.user, 
        onCamera: action.payload.onCamera, 
        hasPermission: action.payload.hasPermission 
      };
    case UPDATE_LOCATION:
        return { ...state, user: action.payload };
    case UPDATE_WATCHING:
      return { ...state, watching: action.payload };
    case OFF_CAMERA:
      return { ...state, onCamera: false };
    case SIGN_OUT:
      return {...state, ...INITIAL_STATE }
    default:
      return state;
  }
};
