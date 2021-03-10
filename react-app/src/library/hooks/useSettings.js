import React, { useEffect, useContext } from 'react';
import { getNotificationsPermission } from 'library/apis/notifications';
import { getLocationPermission } from 'library/apis/geolocation';
import { Settings } from 'context';
import { FeatureCard } from 'library/components';
import { normalizeStyles, getListContent } from 'res';

export default (routeParams) => {
  const { settings, updateSetting } = useContext(Settings.Context);

  const styles = normalizeStyles({
    card: {
      marginTop: 16,
    },
  });

  useEffect(() => {
    // toggle notifications on if coming from onboarding flow
    if (routeParams?.onboarding) {
      updateSetting('notifications', true);
    }
  }, []);

  // assign state using list item keys
  const assignState = (key, prop) => {
    switch (key) {
    case 'notifications':
      return prop === 'toggle' ? settings.notifications : toggleNotifications;
    case 'backgroundGeo':
      return prop === 'toggle' ? settings.backgroundGeo : toggleBackgroundGeo;
    default:
      return;
    }
  };

  // toggle settings
  const toggleNotifications = async () => {
    if (settings.notifications) {
      updateSetting('notifications', false);
    } else {
      const hasPermission = await getNotificationsPermission();

      if (hasPermission) {
        updateSetting('notifications', true);
      }
    }
  };

  const toggleBackgroundGeo = async () => {
    if (settings.backgroundGeo) {
      updateSetting('backgroundGeo', false);
    } else {
      const hasPermission = await getLocationPermission('always');

      if (hasPermission) {
        updateSetting('backgroundGeo', true);
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
