import { Alert, Linking, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS } from 'react-native-permissions';
import { STRINGS } from 'res';

const config = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
  distanceFilter: 100,
  interval: Platform.OS === 'android' ? 10000 : null,
  fastestInterval: Platform.OS === 'android' ? 5000 : null,
  useSignificantChanges: Platform.OS === 'ios' ? true : null,
};

const openSetting = () => {
  Linking.openSettings().catch(() => {
    Alert.alert('Unable to open settings');
  });
};

const showPermissionsDialog = () => {
  const {
    dialog: { location: { title, body } },
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

const showMockLocationDialog = () => {
  const {
    dialog: { mockLocation: { title, body } },
    actions: { tryAgain },
  } = STRINGS;

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

const onLocationHandler = (location, callback) => {
  const { coords, mocked } = location;

  if (mocked) {
    showMockLocationDialog();
    return;
  }
  callback(coords);
};

export const getLocation = async (callback) => {
  const hasPermission = await getLocationPermission();

  if (!hasPermission) {
    showPermissionsDialog();
  } else {
    Geolocation.getCurrentPosition(
      (location) => onLocationHandler(location, callback),
      (error) => console.log(error.code, error.message),
      {
        enableHighAccuracy: config.enableHighAccuracy,
        timeout: config.timeout,
        maximumAge: config.maximumAge,
      }
    );
  }
};

export const watchLocation = async (callback) => {
  const hasPermission = await getLocationPermission();

  if (!hasPermission) {
    showPermissionsDialog();
  } else {
    const watchId = Geolocation.watchPosition(
      (location) => onLocationHandler(location, callback),
      (error) => {
        console.log(error.code, error.message);
      },
      { config },
    );

    return watchId;
  }
};

export const stopWatchingLocation = (watchId) => {
  Geolocation.clearWatch(watchId);
};
