import { useEffect, useState, useContext } from 'react';
import { AppState } from 'react-native';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';
import RNBootSplash from 'react-native-bootsplash';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppState, getStateFromLS, storeStateToLS, updateAppSetting } from 'rdx/appState';
import { updateAuth } from 'rdx/authState';
import { goToTarget } from 'rdx/locationState';
import { updateNotificationShouts } from 'rdx/shoutState';
import * as RootNavigation from 'screens/RootNavigation';
import { getNotificationsPermission } from 'library/apis/notifications';
import { Config } from 'context';
import { STRINGS } from 'res';

export default (isSignedIn) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [navIsReady, setNavIsReady] = useState(false);
  const [newNotification, setNewNotification] = useState(null);
  const configIsReady = useContext(Config.Context);
  const {
    notifications: notificationsEnabled,
    backgroundGeo: backGeoEnabled,
  } = useSelector((state) => state.app.settings);
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
      setNavIsReady(false);
      setAppIsReady(false);
      setNewNotification(null);
    };
  }, []);

  const appStateHandler = (event) => {
    event !== 'unknown' && dispatch(updateAppState(event));
  };

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

  const getIds = () => {
    const { uid } = auth().currentUser;
    const deviceId = DeviceInfo.getUniqueId();
    return { uid, deviceId };
  };

  const updateRegistrationToken = async (token) => {
    const { uid, deviceId } = getIds();

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

  const openShoutFromNotification = async (remoteMessage) => {
    const { data: { shout }, notification: { body } } = remoteMessage;
    parsedShout = JSON.parse(shout);

    dispatch(goToTarget(parsedShout.coordinates));
    RootNavigation.navigate('OpenShout', { shout: { ...parsedShout, text: body } });
  };

  // Push notifications
  useEffect(() => {
    let unsubscribeNotif = () => {};
    if (notificationsEnabled && isSignedIn) {
      // check notifications permissions during launch
      const hasPermission  = getNotificationsPermission();
      if (hasPermission) {
        // listen for notifications when app is opened
        unsubscribeNotif = messaging().onMessage(({ data: { shout }, notification: { body } }) => {
          dispatch(updateNotificationShouts('add', { ...JSON.parse(shout), text: body }));
        });

        // navigate to shout screen when notification is opened (background)
        messaging().onNotificationOpenedApp((remoteMessage) => {
          openShoutFromNotification(remoteMessage);
        });

        // store message when notification is opened (cold start)
        messaging().getInitialNotification()
          .then(async (remoteMessage) => {
            if (remoteMessage) {
              setNewNotification(remoteMessage);
            }
          });

        // update token in firestore
        messaging().getToken()
          .then((token) => updateRegistrationToken(token));
      } else {
        dispatch(updateAppSetting('notifications', false));
      }
    } else if (notificationsEnabled === false) {
      // remove token from firestore
      updateRegistrationToken(null);
    }
    return () => {
      unsubscribeNotif();
    };
  }, [notificationsEnabled, navIsReady]);

  // navigate to shout from cold start after nav stack is ready
  useEffect(() => {
    if (newNotification && navIsReady) {
      openShoutFromNotification(newNotification);
    }
  }, [newNotification, navIsReady]);

  // Background location
  useEffect(() => {
    return () => {

    };
  }, [backGeoEnabled]);

  return [appIsReady, setNavIsReady];
};
