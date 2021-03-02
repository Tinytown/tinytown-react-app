import { useEffect, useState, useContext } from 'react';
import { AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import remoteConfig from '@react-native-firebase/remote-config';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppState, getStateFromLS } from 'rdx/appState';
import { signIn, updateAuth } from 'rdx/authState';
import { getNotificationsPermission } from 'library/apis/notifications';
import { Config } from 'context';
import { STRINGS } from 'res';

import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default (isSignedIn) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const configIsReady = useContext(Config.Context);
  const { notifications: pushNotif, backgroundGeo: backGeo } = useSelector((state) => state.app.settings);
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

    // Check internet connection
    NetInfo.fetch().then(({ isConnected }) => {
      if (!isConnected) {
        Toast.show(STRINGS.connectivity.offline, Toast.LONG);
      }
    });

    // Restore Redux from local storage
    dispatch(getStateFromLS());

    // Listen for auth changes
    const unsubscribeAuth = auth().onAuthStateChanged((user) =>
      (user ? dispatch(signIn(user)) : dispatch(updateAuth(false))));

    // Check notifications permissions
    if (pushNotif) {
      getNotificationsPermission();
    }

    // Listen for notifications
    const unsubscribeNotif = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // Listen for app state changes
    AppState.addEventListener('change', appStateHandler);

    return () => {
      unsubscribeAuth();
      unsubscribeNotif();
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
