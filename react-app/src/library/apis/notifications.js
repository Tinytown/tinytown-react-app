import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import store from 'rdx/store';
import { updateAppSetting } from 'rdx/appState';
import { openSetting } from './linking';
import { getStrings } from 'res';

const config = {
  alert: true,
  announcement: true,
  badge: true,
  carPlay: true,
  sound: true,
};

const showPermissionsDialog = () => {
  const {
    dialog: { notifications: { title, body } },
    navigation: { goToSettings },
    actions: { cancel },
  } = getStrings();

  Alert.alert(title, body,
    [
      { text: cancel, onPress: () => {} },
      { text: goToSettings, onPress: openSetting },
    ],
  );
};

export const getNotificationsPermission = async () => {
  try {
    const hasPermission = await messaging().requestPermission(config);

    if (hasPermission === 1) {
      store.dispatch(updateAppSetting('notifications', true));
      return true;
    } else {
      store.dispatch(updateAppSetting('notifications', false));
      showPermissionsDialog();
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

