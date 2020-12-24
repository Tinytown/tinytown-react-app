import {
  Alert,
  Linking,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS } from 'react-native-permissions';
import store from 'rdx/store';
import { UPDATE_LOCATION, UPDATE_WATCHING } from 'rdx/actions/types';
import RES from 'res';

const { title, body } = RES.STRINGS.dialog.location;

const openSetting = () => {
  Linking.openSettings().catch(() => {
    Alert.alert('Unable to open settings');
  });
};

const showDialog = () => {
  Alert.alert(title, body,
    [
      { text: 'Cancel', onPress: () => {} },
      { text: 'Go to Settings', onPress: openSetting },
    ],
  );
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

export const getLocation = async (successHandler) => {
  const hasPermission = await getLocationPermission();
  if (!hasPermission) {
    showDialog();
  } else {
    Geolocation.getCurrentPosition(
      ({ coords }) => successHandler([coords.longitude, coords.latitude]),
      (error) => console.log(error.code, error.message),
      {
        enableHighAccuracy: config.enableHighAccuracy,
        timeout: config.timeout,
        maximumAge: config.maximumAge,
      }
    );
  }
};

const config = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
  distanceFilter: 100,
  interval: Platform.OS === 'android' ? 10000 : null,
  fastestInterval: Platform.OS === 'android' ? 5000 : null,
  useSignificantChanges: Platform.OS === 'ios' ? true : null,
};
let watchId = null;

export const watchLocation = async () => {
  const hasPermission = await getLocationPermission();
  if (!hasPermission) {
    showDialog();
  } else {
    const state = store.getState();
    const { watching } = state.location;

    const successHandler = (coords) => {
      const payload = {
        user: [coords.longitude, coords.latitude],
        hasPermission,
      };
      store.dispatch({ type: UPDATE_LOCATION, payload });
      store.dispatch({ type: UPDATE_WATCHING, payload: true });
    };

    // Gate to prevent multiple instances
    if (!watching) {
      watchId = Geolocation.watchPosition(
        ({ coords }) => successHandler(coords),
        (error) => {
          console.log(error.code, error.message);
        },
        { config }
      );
    }
  }
};

export const stopWatchingLocation = () => {
  const state = store.getState();
  const { watching } = state.location;

  if (watching) {
    Geolocation.clearWatch(watchId);
    store.dispatch({ type: UPDATE_WATCHING, payload: false });
  }
};
