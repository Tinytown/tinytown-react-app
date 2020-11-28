import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
  trace: true
})

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(reduxThunk)
  ),
);

export default store;