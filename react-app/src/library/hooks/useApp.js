import { useEffect, useState, useContext } from 'react';
import { AppState, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import remoteConfig from '@react-native-firebase/remote-config';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppState, getStateFromLS, storeStateToLS, updateAppSetting } from 'rdx/appState';
import { updateAuth } from 'rdx/authState';
import { getNotificationsPermission } from 'library/apis/notifications';
import { Config } from 'context';
import { STRINGS } from 'res';

export default (isSignedIn) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const configIsReady = useContext(Config.Context);
  const { notifications: pushNotif, backgroundGeo: backGeo } = useSelector((state) => state.app.settings);
  const appActive = useSelector((state) => state.app.active);
  const { user: coordinates } = useSelector((state) => state.location);
  const dispatch = useDispatch();

  // Initial setup / start listeners
  useEffect(() => {
    // use local emulator on dev
    if (__DEV__) {
      remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 0,
      });
      functions().useFunctionsEmulator('http://localhost:5001');
      firestore().settings({ host: 'localhost:8080', ssl: false });
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
    };
  }, []);

  const appStateHandler = (event) => {
    event !== 'unknown' && dispatch(updateAppState(event));
  };

  // hide splash screen
  useEffect(() => {
    if (isSignedIn !== null && configIsReady) {
      SplashScreen.hide();
      setAppIsReady(true);
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

  const updateRegistrationToken = async (token) => {
    const { uid } = auth().currentUser;
    const deviceId = DeviceInfo.getUniqueId();

    await firestore().collection('users')
      .doc(uid)
      .collection('devices')
      .doc(deviceId)
      .update({ registrationToken: token })
      .catch((error) => console.log(error));

    // store location in firestore
    if (token) {
      functions().httpsCallable('storeLocation')({ deviceId, coordinates });
    }
  };

  // Push notifications
  useEffect(() => {
    let unsubscribeNotif = () => {};
    if (pushNotif && isSignedIn) {
      // check notifications permissions during launch
      const hasPermission  = getNotificationsPermission();
      if (hasPermission) {
        // listen for notifications
        unsubscribeNotif = messaging().onMessage(async (remoteMessage) => {
          Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        // register background handler
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          console.log('Message handled in the background!', remoteMessage);
        });

        // update token in firestore
        messaging().getToken()
          .then((token) => updateRegistrationToken(token));
      } else {
        dispatch(updateAppSetting('notifications', false));
      }
    } else if (pushNotif === false) {
      // remove token from firestore
      updateRegistrationToken(null);
    }
    return () => {
      unsubscribeNotif();
    };
  }, [pushNotif]);

  // Background location
  useEffect(() => {
    return () => {

    };
  }, [backGeo]);

  return [appIsReady];
};
