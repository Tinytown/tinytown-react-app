/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import { createStore } from 'redux';
import reducers from './src/redux/reducers';
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),);

const AppContainer = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => AppContainer);
