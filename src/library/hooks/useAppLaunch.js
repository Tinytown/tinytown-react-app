import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { updateAppState, getStateFromLS } from 'rdx/appState';
import { signIn, updateAuth } from 'rdx/authState';

export default (isSignedIn) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();

  // Initial setup / start listeners
  useEffect(() => {
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
