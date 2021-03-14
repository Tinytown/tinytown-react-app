import { Alert } from 'react-native';
import { checkNotifications, requestNotifications } from 'react-native-permissions';
import { openSetting } from './linking';
import { getStrings } from 'res';

const config = ['alert', 'sound', 'provisional', 'carPlay'];

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
  let hasPermission = await checkNotifications(config);

  if (hasPermission.status === 'granted') {
    return true;
  }

  hasPermission = await requestNotifications(config);
  if (hasPermission.status === 'granted') {
    return true;
  }

  showPermissionsDialog();
  return false;
};

