import { Alert, Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { STRINGS } from 'res';

const config = {
  alert: true,
  announcement: true,
  badge: true,
  carPlay: true,
  sound: true,
};

const openSetting = () => {
  Linking.openSettings().catch(() => {
    Alert.alert('Unable to open settings');
  });
};

const showPermissionsDialog = () => {
  const {
    dialog: { notifications: { title, body } },
    navigation: { settings },
    actions: { cancel },
  } = STRINGS;

  Alert.alert(title, body,
    [
      { text: cancel, onPress: () => {} },
      { text: settings, onPress: openSetting },
    ],
  );
};

export const getNotificationsPermission = async () => {
  const hasPermission = await messaging().requestPermission(config);

  if (hasPermission === 1) {
    return true;
  } else {
    showPermissionsDialog();
    return false;
  }
};
