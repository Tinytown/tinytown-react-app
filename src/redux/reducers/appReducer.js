import { APP_STATE, APP_LOAD } from '../actions/types';

const INITIAL_STATE = {
  active: true,
  loaded: {
    map: false,
    staticMap: false,
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APP_STATE:
      return { ...state, active: action.payload };
    case APP_LOAD:
      return {...state, loaded: { ...state.loaded, [action.payload.key]: action.payload.value }}
    default:
      return state;
  }
};
