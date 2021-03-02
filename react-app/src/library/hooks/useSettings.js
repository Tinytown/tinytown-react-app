import React, { useEffect } from 'react';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppSetting } from 'rdx/appState';
import { FeatureCard } from 'library/components';
import { normalizeStyles, getListContent } from 'res';

import { Alert } from 'react-native';

export default (routeParams) => {
  const { notifications: pushNotif, backgroundGeo: backGeo } = useSelector((state) => state.app.settings);
  const dispatch = useDispatch();

  const styles = normalizeStyles({
    card: {
      marginTop: 16,
    },
  });

  useEffect(() => {
    if (routeParams?.onboarding) {
      dispatch(updateAppSetting('notifications', true));
    }
  }, []);

  // Assign state using list item keys
  const assignState = (key, prop) => {
    switch (key) {
    case 'notifications':
      return prop === 'toggle' ? pushNotif : () => dispatch(updateAppSetting(key, !pushNotif));
    case 'backgroundGeo':
      return prop === 'toggle' ? backGeo : () => dispatch(updateAppSetting(key, !backGeo));
    default:
      return;
    }
  };

  // Render list
  const settingsList = getListContent('settings');
  renderedList = settingsList.map(({ key, title, body, icon, activeTheme }) => (
    <FeatureCard
      key={key}
      title={title}
      body={body}
      icon={icon}
      activeTheme={activeTheme}
      wrapperStyle={styles.card}
      toggle={assignState(key, 'toggle')}
      onPress={assignState(key, 'onPress')}
    />
  ));

  // Notifications
  useEffect(() => {
    let unsubscribeNotif = () => {};
    if (pushNotif) {
      // Listen for notifications
      unsubscribeNotif = messaging().onMessage(async (remoteMessage) => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });

      // Register background handler
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
      });
    } else {
      // TODO disable notifications
    }
    return () => {
      unsubscribeNotif();
    };
  }, [pushNotif]);

  return { renderedList };
};
