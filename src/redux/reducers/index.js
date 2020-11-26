import { combineReducers } from 'redux';
import authReducer from './authReducer';
import mapReducer from './mapReducer';
import appReducer from './appReducer';

export default combineReducers({
  auth: authReducer,
  location: mapReducer,
  app: appReducer
});
