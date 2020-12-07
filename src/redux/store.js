import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import stateValidator from './middlewares/stateValidator';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
  trace: true,
});

const INITIAL_STATE = {
  auth: {
    isSignedIn: false,
    user: {
      photoURL: '',
      displayName: '',
      uid: '',
    },
  },
  location: {
    user: null,
    hasPermission: false,
    watchingLocation: false,
    goToUser: false,
    userVisible: false,
  },
  app: {
    active: true,
    loaded: {
      map: false,
    },
  },
};

export default (store = createStore(
  reducers,
  INITIAL_STATE,
  composeEnhancers(applyMiddleware(reduxThunk, stateValidator)),
));
