import { APP_STATE } from '../actions/types';

const INITIAL_STATE = {
  state: 'active',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APP_STATE:
      return { ...state, state: action.payload };
    default:
      return state;
  }
};
