/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import App from './App';
import { name as appName } from './app.json';

const AppContainer = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics} >
      <App/>
    </SafeAreaProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppContainer);
