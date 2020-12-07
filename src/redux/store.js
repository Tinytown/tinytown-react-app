import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import stateValidator from './middlewares/stateValidator'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import INITIAL_STATE from './initialState'

const composeEnhancers = composeWithDevTools({
  trace: true,
});

export default (store = createStore(
  reducers,
  INITIAL_STATE,
  composeEnhancers(applyMiddleware(reduxThunk, stateValidator)),
));
