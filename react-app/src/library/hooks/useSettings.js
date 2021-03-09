import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppSetting } from 'rdx/appState';
import { getNotificationsPermission } from 'library/apis/notifications';
import { getLocationPermission } from 'library/apis/geolocation';
import { FeatureCard } from 'library/components';
import { normalizeStyles, getListContent } from 'res';

export default (routeParams) => {
  const {
    notifications: notificationsEnabled,
    backgroundGeo: backGeoEnabled,
  } = useSelector((state) => state.app.settings);
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

  // assign state using list item keys
  const assignState = (key, prop) => {
    switch (key) {
    case 'notifications':
      return prop === 'toggle' ? notificationsEnabled : toggleNotifications;
    case 'backgroundGeo':
      return prop === 'toggle' ? backGeoEnabled : toggleBackgroundGeo;
    default:
      return;
    }
  };

  // toggle settings
  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      dispatch(updateAppSetting('notifications', false));
    } else {
      const hasPermission = await getNotificationsPermission();

      if (hasPermission) {
        dispatch(updateAppSetting('notifications', true));
      }
    }
  };

  const toggleBackgroundGeo = async () => {
    if (backGeoEnabled) {
      dispatch(updateAppSetting('backgroundGeo', false));
    } else {
      const hasPermission = await getLocationPermission('always');

      if (hasPermission) {
        dispatch(updateAppSetting('backgroundGeo', true));
      }
    }
  };

  // render list
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
