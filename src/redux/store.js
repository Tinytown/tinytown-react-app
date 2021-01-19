import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import stateValidator from './middlewares/stateValidator';
import reducers from './reducers';
import INITIAL_STATE from './initialState';

const middlewares = [reduxThunk, stateValidator];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export default store = createStore(
  reducers,
  INITIAL_STATE,
  applyMiddleware(...middlewares),
);
