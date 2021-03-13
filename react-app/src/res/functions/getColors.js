import remoteConfig from '@react-native-firebase/remote-config';

export default () => {
  const { COLORS } = remoteConfig().getAll();
  return JSON.parse(COLORS.asString());
};
