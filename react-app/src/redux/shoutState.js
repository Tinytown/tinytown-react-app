import functions from '@react-native-firebase/functions';
import { CREATE_SHOUT } from './actionTypes';

export const shoutReducer = (state = null, action) => {
  switch (action.type) {
  case CREATE_SHOUT:
    return { ...state,  created: [...action.payload] };
  default:
    return state;
  }
};

export const createShout = (shout) => async (dispatch, getState) => {
  const { shouts: { created } } = getState();
  created.push(shout);

  dispatch({ type: CREATE_SHOUT, payload: created });

  // Add shout Id when successfully uploaded
  const { data: { shoutId } } = await functions().httpsCallable('createShout')(shout);

  if (shoutId) {
    created[created.length - 1] = { ...shout, id: shoutId };
    dispatch({ type: CREATE_SHOUT, payload: created });
  }
};

