import React, { useState, useEffect, useRef, useContext } from 'react';
import { Alert, Linking, Keyboard, Platform } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import functions from '@react-native-firebase/functions';
import { useDispatch, useSelector } from 'react-redux';
import { updateAppSetting } from 'rdx/appState';
import { createShout } from 'rdx/shoutState';
import { storeData, getData } from 'library/apis/storage';
import sheetConfig from 'library/components/BottomSheet/config';
import { Config } from 'context';
import { FeatureCard, FeatureItem } from 'library/components';
import  useAnimation  from './useAnimation';
import { normalizeStyles, getListContent } from 'res';

export default (routeParams) => {
  const dispatch = useDispatch();
  const { notifications: pushNotif, backgroundGeo: backGeo } = useSelector((state) => state.app.settings);
  const styles = normalizeStyles({
    card: {
      marginTop: 16,
    },
  });

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

  useEffect(() => {
    if (routeParams?.onboarding) {
      updateAppSetting('notifications', true);
      // TODO show permissisions dialog
    }
  }, []);

  return { renderedList };
};
