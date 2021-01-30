import { combineReducers } from 'redux';
import { authReducer } from './authState';
import { locationReducer } from './locationState';
import { appReducer } from './appState';

export default combineReducers({
  auth: authReducer,
  location: locationReducer,
  app: appReducer,
});
