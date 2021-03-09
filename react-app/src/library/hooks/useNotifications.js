import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import { goToTarget } from 'rdx/locationState';
import { updateAppSetting } from 'rdx/appState';
import { updateNotificationShouts } from 'rdx/shoutState';
import * as RootNavigation from 'screens/RootNavigation';
import { getNotificationsPermission } from 'library/apis/notifications';

export default (isSignedIn) => {
  const [navIsReady, setNavIsReady] = useState(false);
  const [newNotification, setNewNotification] = useState(null);
  const { notifications: notificationsEnabled } = useSelector((state) => state.app.settings);
  const { user: coordinates } = useSelector((state) => state.location);

  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeNotif = () => {};
    if (notificationsEnabled && isSignedIn) {
      initNotifications();
    } else if (notificationsEnabled === false) {
      // remove token from firestore
      updateRegistrationToken(null);
    }

    // navigate to shout from cold start after nav stack is ready
    if (newNotification && navIsReady) {
      openShoutFromNotification(newNotification);
    }
    return () => {
      unsubscribeNotif();
    };
  }, [notificationsEnabled, navIsReady, newNotification]);

  const initNotifications = async () => {
    const hasPermission = await getNotificationsPermission();

    if (hasPermission) {
      dispatch(updateAppSetting('notifications', true));

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
  };

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

  return [setNavIsReady];
};
