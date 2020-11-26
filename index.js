/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import store from './src/redux/store'
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';

const AppContainer = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => AppContainer);
