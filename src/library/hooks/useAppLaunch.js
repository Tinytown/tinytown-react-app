import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import store from 'rdx/store';
import { updateAppState, getStateFromLS } from 'rdx/appState';
import { signIn, updateAuth } from 'rdx/authState';

export default (isSignedIn) => {
  const [appIsReady, setAppIsReady] = useState(false);

  // Initial setup / start listeners
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
    event !== 'unknown' && store.dispatch(updateAppState(event));
  };

  // Hide splash screen
  useEffect(() => {
    if (isSignedIn !== null) {
      SplashScreen.hide();
      setAppIsReady(true);
    }
  }, [isSignedIn]);

  return [appIsReady];
};
