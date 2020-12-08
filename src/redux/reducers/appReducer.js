import { APP_STATE, APP_LOAD } from 'rdx/actions/types';

export default (state = null, action) => {
  switch (action.type) {
  case APP_STATE:
    return { ...state, active: action.payload };
  case APP_LOAD:
    return { ...state, loaded: { ...state.loaded, [action.payload.key]: action.payload.value } }
  default:
    return state;
  }
};
