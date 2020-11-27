import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import store from '../../redux/store'
import { UPDATE_LOCATION, UPDATE_WATCHING } from '../../redux/actions/types';
import R from 'res/R'

const { title, body } = R.strings.dialog.location

const openSetting = () => {
  Linking.openSettings().catch(() => {
    Alert.alert('Unable to open settings');
  });
};

const settingsDialog = () => {
  Alert.alert(title, body,
    [
      { text: "Cancel", onPress: () => {} },
      { text: 'Go to Settings', onPress: openSetting},
    ],
  );
}

export const getLocationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  if (Platform.OS === 'android') {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED || PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      settingsDialog()
    }
    return false;
  }

  if (Platform.OS === 'ios') {
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied' || 'disabled') {
      settingsDialog()
    }

    return false;
  }
}

const config = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
  distanceFilter: 100,
  interval: Platform.OS === 'android' ? 10000 : null,
  fastestInterval: Platform.OS === 'android' ? 5000 : null,
  useSignificantChanges: Platform.OS === 'ios' ? true : null
}

export const getLocation = (successHandler) => {
  Geolocation.getCurrentPosition(
    ({coords}) => successHandler(coords),
    (error) => console.log(error.code, error.message),
    { 
    enableHighAccuracy: config.enableHighAccuracy,
    timeout: config.timeout,
    maximumAge: config.maximumAge 
    }
  );
}

let watchId = null;

export const watchLocation = () => {
  const state = store.getState()
  const watching = state.location.watching;

  const successHandler = (coords) => {
    const payload = {
      longitude: coords.longitude,
      latitude: coords.latitude
    }
    store.dispatch({ type: UPDATE_LOCATION, payload });
  }

  // Gate to prevent multiple instances
  if (!watching) {
    watchId = Geolocation.watchPosition(
      ({coords}) => successHandler(coords),
      (error) => console.log(error.code, error.message),
      { config }
    )
    store.dispatch({ type: UPDATE_WATCHING, payload: true })
  }
}

export const stopWatchingLocation = () => {
  const state = store.getState()
  const watching = state.location.watching;

  if (watching) {
    Geolocation.clearWatch(watchId)
    store.dispatch({ type: UPDATE_WATCHING, payload: false })
  }
}

