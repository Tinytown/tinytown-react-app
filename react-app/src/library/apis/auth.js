import auth from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';

export const getIds = () => {
  if (auth().currentUser) {
    const { uid } = auth().currentUser;
    const deviceId = DeviceInfo.getUniqueId();
    return { uid, deviceId };
  } else {
    return { uid: null, deviceId: null };
  }
};
