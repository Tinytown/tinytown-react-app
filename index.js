/**
 * @format
 */

import React, { useEffect } from 'react';
import { AppRegistry, AppState } from 'react-native';
import auth from '@react-native-firebase/auth';
import { getData } from 'library/apis/storage';
import store from 'rdx/store';
import { Provider } from 'react-redux';
import { signIn, updateAppState, updateUserLocation, updateStorageLoaded } from 'rdx/actions';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import App from './App';
import { name as appName } from './app.json';

const AppContainer = () => {
  useEffect(() => {
    // Load location from LS
    getData('userLocation').then((location) => {
      store.dispatch(updateStorageLoaded());
      if (location) {
        store.dispatch(updateUserLocation(location));
      }
    });

    // Load auth state
    const subscriber = auth().onAuthStateChanged((user) => (user ? store.dispatch(signIn(user)) : null));

    // App state listener
    AppState.addEventListener('change', appStateHandler);

    return () => {
      subscriber; // unsubscribe on unmount
      AppState.removeEventListener('change', appStateHandler);
    };
  }, []);

  const appStateHandler = (event) => {
    event !== 'unknown' ? store.dispatch(updateAppState(event)) : null;
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics} >
        <App/>
      </SafeAreaProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AppContainer);
