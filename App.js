/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';

import Splash from './frontend/splash';
import Map from './frontend/mapbox';

const App = () =>
  <>
    <StatusBar barStyle='dark-content' />
    <SafeAreaView>
      {/* <Splash></Splash> */}
      <Map></Map>
    </SafeAreaView>
  </>
;

const styles = StyleSheet.create({
});

export default App;
