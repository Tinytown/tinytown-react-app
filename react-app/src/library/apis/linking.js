import { Alert, Linking } from 'react-native';
import { getStrings } from 'res';

export const openSetting = () => {
  const STRINGS = getStrings();
  Linking.openSettings().catch(() => {
    Alert.alert(STRINGS.dialog.unableSettings);
  });
};
