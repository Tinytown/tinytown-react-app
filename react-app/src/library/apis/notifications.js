import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
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
    navigation: { settings },
    actions: { cancel },
  } = getStrings();

  Alert.alert(title, body,
    [
      { text: cancel, onPress: () => {} },
      { text: settings, onPress: openSetting },
    ],
  );
};

export const getNotificationsPermission = async () => {
  try {
    const hasPermission = await messaging().requestPermission(config);

    if (hasPermission === 1) {
      return true;
    } else {
      showPermissionsDialog();
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
