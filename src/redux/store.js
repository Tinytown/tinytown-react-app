import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import stateValidator from './middlewares/stateValidator';
import reducers from './reducers';
import INITIAL_STATE from './initialState';

const composeEnhancers = composeWithDevTools({
  trace: true,
});

export default (store = createStore(
  reducers,
  INITIAL_STATE,
  composeEnhancers(applyMiddleware(reduxThunk, stateValidator)),
));
