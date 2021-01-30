/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import store from 'rdx/store';
import { Provider } from 'react-redux';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import App from './src/App';
import { name as appName } from './app.json';

const AppContainer = () => (
  <Provider store={store}>
    <SafeAreaProvider initialMetrics={initialWindowMetrics} >
      <App/>
    </SafeAreaProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppContainer);
