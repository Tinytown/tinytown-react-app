/**
 * @format
 */

import React, { useEffect } from 'react';
import { AppRegistry, AppState } from 'react-native';
import auth from '@react-native-firebase/auth';
import store from 'rdx/store';
import { Provider } from 'react-redux';
import { updateAppState, getStateFromLS } from 'rdx/appState';
import { signIn, updateAuth } from 'rdx/authState';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import App from './App';
import { name as appName } from './app.json';

const AppContainer = () => {
  useEffect(() => {
    store.dispatch(getStateFromLS());
    const unsubscribe = auth().onAuthStateChanged((user) =>
      (user ? store.dispatch(signIn(user)) : store.dispatch(updateAuth(false))));

    AppState.addEventListener('change', appStateHandler);

    return () => {
      unsubscribe();
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
