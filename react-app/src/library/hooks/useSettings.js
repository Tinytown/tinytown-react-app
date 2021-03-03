import React, { useEffect } from 'react';
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

  // assign state using list item keys
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
