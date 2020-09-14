/**
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

// import Splash from './frontend/splash';
import Map from './frontend/mapbox';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View>
      <StatusBar barStyle = "light-content" translucent = {true} backgroundColor="#00000099"/>
      {/* <Splash></Splash>*/}
      <Map></Map>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default App;
