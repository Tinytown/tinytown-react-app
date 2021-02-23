import { useEffect, useState, useContext } from 'react';
import { AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import remoteConfig from '@react-native-firebase/remote-config';
import { useDispatch } from 'react-redux';
import { updateAppState, getStateFromLS } from 'rdx/appState';
import { signIn, updateAuth } from 'rdx/authState';
import { Config } from 'context';

export default (isSignedIn) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const configIsReady = useContext(Config.Context);
  const dispatch = useDispatch();

  // Initial setup / start listeners
  useEffect(() => {
    // Use local emulator on dev
    if (__DEV__) {
      remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 0,
      });
      functions().useFunctionsEmulator('http://localhost:5001');
      firestore().settings({ host: 'localhost:8080', ssl: false });
    }

    // Restore Redux from local storage
    dispatch(getStateFromLS());

    // Listen for auth changes
    const unsubscribe = auth().onAuthStateChanged((user) =>
      (user ? dispatch(signIn(user)) : dispatch(updateAuth(false))));

    // Listen for app state changes
    AppState.addEventListener('change', appStateHandler);

    return () => {
      unsubscribe();
      AppState.removeEventListener('change', appStateHandler);
    };
  }, []);

  const appStateHandler = (event) => {
    event !== 'unknown' && dispatch(updateAppState(event));
  };

  // Hide splash screen
  useEffect(() => {
    if (isSignedIn !== null && configIsReady) {
      SplashScreen.hide();
      setAppIsReady(true);
    }
  }, [isSignedIn, configIsReady]);

  return [appIsReady];
};
