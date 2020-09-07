/**
 * @format
 * @flow strict-local
 */

import { typography, colors } from './frontend/styles'
import React from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';

// import Splash from './frontend/splash';
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

export default App;
