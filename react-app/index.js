/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from 'rdx/store';
import { Config } from 'context';
import { name as appName } from './app.json';
import App from './src/App';

const AppContainer = () => (
  <Provider store={store}>
    <SafeAreaProvider initialMetrics={initialWindowMetrics} >
      <Config.Provider>
        <App/>
      </Config.Provider>
    </SafeAreaProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppContainer);
