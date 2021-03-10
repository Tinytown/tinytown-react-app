import { Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { check, request, PERMISSIONS } from 'react-native-permissions';
import { openSetting } from './linking';
import { getStrings } from 'res';

const {
  DESIRED_ACCURACY_HIGH,
  DESIRED_ACCURACY_LOW,
  LOG_LEVEL_VERBOSE,
  setConfig,
  ready,
  start,
  stop,
  onLocation,
  removeListeners,
} = BackgroundGeolocation;

const { getCurrentPosition, watchPosition, clearWatch } = Geolocation;

const foregroundConfig = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
  distanceFilter: 10,
  interval: Platform.OS === 'android' ? 10000 : null,
  fastestInterval: Platform.OS === 'android' ? 5000 : null,
  useSignificantChanges: Platform.OS === 'ios' ? true : null,
};

export const backgroundConfig = {
  desiredAccuracy: DESIRED_ACCURACY_HIGH,
  distanceFilter: 400,
  debug: true,
  logLevel: LOG_LEVEL_VERBOSE,
  startOnBoot: true,
  stopOnTerminate: false,
  stopOnStationary: true,
  useSignificantChangesOnly: true,
  showsBackgroundLocationIndicator: false,
  disableLocationAuthorizationAlert: true,
};

const showLocationPermissionDialog = () => {
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

export const showBackGeoPermissionDialog = () => {
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

export const getLocationPermission = async (authReq = 'wheninuse') => {
  if (authReq === 'wheninuse') {
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

    showLocationPermissionDialog();
    return false;
  } else if (authReq === 'always') {
    const geoPermissionStr = Platform.OS === 'android' ?
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS;

    const motionPermissionStr = Platform.OS === 'android' ?
      PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION : PERMISSIONS.IOS.MOTION;

    let hasGeoPermission = await check(geoPermissionStr);
    let hasMotionPermission = await check(motionPermissionStr);
    if (hasGeoPermission === 'granted' && hasMotionPermission === 'granted') {
      return true;
    }

    hasGeoPermission = await request(geoPermissionStr);
    hasMotionPermission = await request(motionPermissionStr);
    if (hasGeoPermission === 'granted' && hasMotionPermission === 'granted') {
      return true;
    }

    showBackGeoPermissionDialog();
    return false;
  }
};

export const onLocationHandler = (location, callback) => {
  const { coords, mocked } = location;

  // if (mocked) {
  //   showMockLocationDialog();
  //   return;
  // }
  callback(coords);
};

export const getLocation = async (callback) => {
  const hasPermission = await getLocationPermission();

  if (hasPermission) {
    getCurrentPosition(
      (location) => onLocationHandler(location, callback),
      (error) => console.log(error.code, error.message),
      {
        enableHighAccuracy: foregroundConfig.enableHighAccuracy,
        timeout: foregroundConfig.timeout,
        maximumAge: foregroundConfig.maximumAge,
      }
    );
  }
};

export const watchLocation = async (callback) => {
  const hasPermission = await getLocationPermission();

  if (hasPermission) {
    const watchId = watchPosition(
      (location) => onLocationHandler(location, callback),
      (error) => {
        console.log(error.code, error.message);
      },
      { foregroundConfig },
    );
    console.log('started foreground watching: ', watchId);
    return watchId;
  }
};

export const stopWatchingLocation = (watchId) => {
  console.log('stopped foreground watching: ', watchId);
  clearWatch(watchId);
};
