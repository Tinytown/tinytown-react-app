import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import remoteConfig from '@react-native-firebase/remote-config';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { updateAppState, getStateFromLS } from 'rdx/appState';
import { signIn, updateAuth } from 'rdx/authState';

export default (isSignedIn) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [configIsReady, setConfigIsReady] = useState(false);
  const dispatch = useDispatch();

  // Initial setup / start listeners
  useEffect(() => {
    // Fetch remote config
    remoteConfig().fetchAndActivate()
      .then((fetchedRemotely) => {
        if (fetchedRemotely) {
          setConfigIsReady(true);
          console.log('Configs were retrieved from backend and activated.');
        } else {
          console.log(
            'No configs were fetched from backend, and the local configs were already activated',
          );
        }
      });

    // Use local emulator on dev
    if (__DEV__) {
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
