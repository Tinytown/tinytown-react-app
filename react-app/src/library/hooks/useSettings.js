import React, { useState, useEffect, useRef, useContext } from 'react';
import { Alert, Linking, Keyboard, Platform } from 'react-native';
import functions from '@react-native-firebase/functions';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppSetting } from 'rdx/appState';
import { storeData, getData } from 'library/apis/storage';
import { getNotificationsPermission, disableNotifications } from 'library/apis/notifications';
import { Config } from 'context';
import { FeatureCard } from 'library/components';
import { normalizeStyles, getListContent } from 'res';

export default (routeParams) => {
  const dispatch = useDispatch();
  const { notifications: pushNotif, backgroundGeo: backGeo } = useSelector((state) => state.app.settings);
  const styles = normalizeStyles({
    card: {
      marginTop: 16,
    },
  });

  useEffect(() => {
    if (routeParams?.onboarding) {
      getNotificationsPermission();
    }
  }, []);

  const notificationsHandler = () => {
    if (!pushNotif) {
      getNotificationsPermission();
    } else {
      disableNotifications();
    }
  };

  // Assign state using list item keys
  const assignState = (key, prop) => {
    switch (key) {
    case 'notifications':
      return prop === 'toggle' ? pushNotif : notificationsHandler;
    case 'backgroundGeo':
      return prop === 'toggle' ? backGeo : () => dispatch(updateAppSetting(key, !backGeo));
    default:
      return;
    }
  };

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

  return { renderedList };
};
