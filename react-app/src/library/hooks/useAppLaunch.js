import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { updateAppState, getStateFromLS } from 'rdx/appState';
import { signIn, updateAuth } from 'rdx/authState';
import config from 'config/env.config';

export default (isSignedIn) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();

  // Initial setup / start listeners
  useEffect(() => {
    if (config.NODE_ENV === 'dev') {
      functions().useFunctionsEmulator('http://localhost:5001');
      firestore().settings({ host: 'localhost:8080', ssl: false });
    }

    dispatch(getStateFromLS());
    const unsubscribe = auth().onAuthStateChanged((user) =>
      (user ? dispatch(signIn(user)) : dispatch(updateAuth(false))));

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
    if (isSignedIn !== null) {
      SplashScreen.hide();
      setAppIsReady(true);
    }
  }, [isSignedIn]);

  return [appIsReady];
};
