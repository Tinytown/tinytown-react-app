import { useEffect, useState, useContext } from 'react';
import { AppState, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import BackgroundGeolocation from 'react-native-background-geolocation';
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
  const appState = useSelector((state) => state.app.state);
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

    // listen for background location changes
    BackgroundGeolocation.onLocation(
      (location) => console.log(location),
      (error) => console.log(error)
    );

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
    if (appState === 'active') {
      dispatch(getStateFromLS());
    } else if (appState === 'inactive') {
      dispatch(storeStateToLS());
    }
  }, [appState]);

  const appStateHandler = (event) => {
    if (Platform.OS === 'android' && event === 'background') {
      dispatch(updateAppState('inactive'));
    } else if (event !== 'unknown') {
      dispatch(updateAppState(event));
    }
  };

  return [appIsReady];
};
