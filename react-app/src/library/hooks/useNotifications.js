import { useEffect, useState, useContext } from 'react';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import { goToTarget } from 'rdx/locationState';
import { updateNotificationShouts } from 'rdx/shoutState';
import { Settings } from 'context';
import * as RootNavigation from 'screens/RootNavigation';
import { getNotificationsPermission } from 'library/apis/notifications';
import { getIds } from 'library/apis/auth';

export default (isSignedIn) => {
  const [navIsReady, setNavIsReady] = useState(false);
  const [newNotification, setNewNotification] = useState(null);
  const { settings: { notifications: notificationsEnabled }, updateSetting } = useContext(Settings.Context);
  const { user: coordinates } = useSelector((state) => state.location);

  const dispatch = useDispatch();

  useEffect(() => {
    let subscribers = [];

    if (notificationsEnabled && isSignedIn) {
      enableNotifications(subscribers);
    } else if (notificationsEnabled === false && isSignedIn) {
      disableNotifications(subscribers);
    }

    // navigate to shout from cold start after nav stack is ready
    if (newNotification && navIsReady) {
      openShoutFromNotification(newNotification);
    }
    return () => {
      if (subscribers.length) {
        subscribers.forEach((unsubscribe) => {
          unsubscribe();
        });
      }
    };
  }, [notificationsEnabled, navIsReady, newNotification]);

  const enableNotifications = async (subscribers) => {
    const hasPermission = await getNotificationsPermission();

    if (hasPermission) {
      // listen for notifications when app is opened
      const unsubOnMessage = messaging().onMessage(({ data: { shout }, notification: { body } }) => {
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
        .then(updateRegistrationToken);

      // listen for token refresh when app is opened
      const unsubOnTokenRefresh = messaging().onTokenRefresh(updateRegistrationToken);

      subscribers.push(unsubOnMessage, unsubOnTokenRefresh);
    } else {
      updateSetting('notifications', false);
    }
  };
  const disableNotifications = async (subscribers) => {
    if (subscribers.length) {
      subscribers.forEach((unsubscribe) => {
        unsubscribe();
      });
    }
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
    if (token && coordinates && deviceId) {
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
