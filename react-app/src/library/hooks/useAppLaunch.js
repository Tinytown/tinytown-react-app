import { useEffect, useState, useContext } from 'react';
import { AppState } from 'react-native';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import RNBootSplash from 'react-native-bootsplash';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppState, getStateFromLS, storeStateToLS } from 'rdx/appState';
import { updateAuth } from 'rdx/authState';
import { Config } from 'context';
import { STRINGS } from 'res';

export default (isSignedIn) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const configIsReady = useContext(Config.Context);
  const appActive = useSelector((state) => state.app.active);
  const dispatch = useDispatch();

  // Initial setup / start listeners
  useEffect(() => {
    // use local emulator on dev
    if (__DEV__) {
      remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 0,
      });
      functions().useFunctionsEmulator('http://localhost:5001');
      firestore().settings({ host: 'localhost:8080', ssl: false, persistence: false });
    }

    // check internet connection
    NetInfo.fetch().then(({ isConnected }) => {
      if (!isConnected) {
        Toast.show(STRINGS.connectivity.offline, Toast.LONG);
      }
    });

    // listen for auth changes
    const unsubscribeAuth = auth().onAuthStateChanged((user) => dispatch(updateAuth(user)));

    // listen for app state changes
    AppState.addEventListener('change', appStateHandler);

    return () => {
      unsubscribeAuth();
      AppState.removeEventListener('change', appStateHandler);
      setAppIsReady(false);
    };
  }, []);

  // hide splash screen
  useEffect(() => {
    if (isSignedIn !== null && configIsReady) {
      setAppIsReady(true);
      RNBootSplash.hide({ fade: true });
    }
  }, [isSignedIn, configIsReady]);

  // load / store from local storage
  useEffect(() => {
    if (appActive) {
      dispatch(getStateFromLS());
    } else {
      dispatch(storeStateToLS());
    }
  }, [appActive]);

  const appStateHandler = (event) => {
    event !== 'unknown' && dispatch(updateAppState(event));
  };

  return [appIsReady];
};
