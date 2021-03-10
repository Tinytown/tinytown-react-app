import auth from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';

export const getIds = () => {
  const { uid } = auth().currentUser;
  const deviceId = DeviceInfo.getUniqueId();
  return { uid, deviceId };
};
