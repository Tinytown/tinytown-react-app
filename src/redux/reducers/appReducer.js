import { APP_STATE, APP_STORAGE } from 'rdx/actions/types';

export default (state = null, action) => {
  switch (action.type) {
  case APP_STATE:
    return { ...state, active: action.payload };
  case APP_STORAGE:
    return { ...state, storageLoaded: action.payload };
  default:
    return state;
  }
};
