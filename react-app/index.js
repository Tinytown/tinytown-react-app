/**
 * @format
 */

import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import { Provider } from 'react-redux';
import store from 'rdx/store';
import { Config } from 'context';
import { name as appName } from './app.json';
import App from './src/App';

const AppContainer = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics} >
        <Config.Provider>
          <App/>
        </Config.Provider>
      </SafeAreaProvider>
    </Provider>
  ); };

const HeadlessCheck = () => {
  if (Platform.OS === 'ios') {
    messaging().getIsHeadless()
      .then((isHeadless) => {
        if (isHeadless) {
          return null;
        }
      }
      );
  }
  return <AppContainer/>;
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);

messaging().setBackgroundMessageHandler(async () => {
  console.log('Message handled in the background!');
});
