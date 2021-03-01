import remoteConfig from '@react-native-firebase/remote-config';

export default () => {
  const { STRINGS } = remoteConfig().getAll();
  return JSON.parse(STRINGS.asString());
};
