/**
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Splash from './frontend/splash';
// import Map from './frontend/mapbox';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView>
      <Splash></Splash>
      {/* <Map></Map> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
});

export default App;
