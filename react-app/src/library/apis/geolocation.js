import { Alert, Platform } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { check, request, PERMISSIONS } from 'react-native-permissions';
import { openSetting } from './linking';
import { getStrings } from 'res';

const {
  DESIRED_ACCURACY_HIGH,
  DESIRED_ACCURACY_LOW,
  LOG_LEVEL_VERBOSE,
  setConfig,
  getCurrentPosition,
  start,
  stop,
  removeListeners,
} = BackgroundGeolocation;

export const foregroundConfig = {
  desiredAccuracy: DESIRED_ACCURACY_HIGH,
  distanceFilter: 5,
  debug: false,
  logLevel: LOG_LEVEL_VERBOSE,
  stopOnTerminate: true,
  startOnBoot: true,
  locationAuthorizationRequest: 'WhenInUse',
  showsBackgroundLocationIndicator: false,
  disableLocationAuthorizationAlert: true,
};

export const backgroundConfig = {
  desiredAccuracy: DESIRED_ACCURACY_LOW,
  distanceFilter: 200,
  stopOnStationary: true,
  useSignificantChangesOnly: true,
};

const showFgLocationDialog = () => {
  const {
    dialog: { location: { title, body } },
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

const showBgLocationDialog = () => {
  const {
    dialog: { backgroundGeo: { title, body } },
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

const showMockLocationDialog = () => {
  const {
    dialog: { mockLocation: { title, body } },
    actions: { tryAgain },
  } = getStrings();

  Alert.alert(title, body, [{ text: tryAgain, onPress: () => {} }]);
};

export const getLocationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const permissionStr = Platform.OS === 'android' ?
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

  let hasPermission = await check(permissionStr);
  if (hasPermission === 'granted') {
    return true;
  }

  hasPermission = await request(permissionStr);
  if (hasPermission === 'granted' || hasPermission === 'limited') {
    return true;
  }

  return false;
};

export const onLocationHandler = (location, callback) => {
  const { coords, mock } = location;

  if (mock) {
    showMockLocationDialog();
    return;
  }
  callback(coords);
};

export const getLocation = async (callback) => {
  const hasPermission = await getLocationPermission();
  if (!hasPermission) {
    showFgLocationDialog();
  } else {
    getCurrentPosition(
      {
        timeout: 30,
        maximumAge: 10000,
      },
      (location) => onLocationHandler(location, callback),
      (error) => console.log(error),
    );
  }
};

export const watchLocation = async (authReq) => {
  const hasPermission = await getLocationPermission(authReq);

  if (!hasPermission) {
    showFgLocationDialog();
  } else {
    setConfig(foregroundConfig);
    start(
      () => console.log('Started watching location'),
      (error) => console.log(error),
    );
  }
};

export const switchToBackground = async () => {
  console.log('watching in background');
  setConfig(backgroundConfig);
};

export const stopWatchingLocation = () => {
  console.log('Stopped watching location');
  stop();
  removeListeners();
};
