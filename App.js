/**
 * @format
 * @flow strict-local
 */

import { typography, colors } from './frontend/styles'
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

// import Splash from './frontend/splash';
import Map from './frontend/mapbox';

const App = () =>
  <>
    <View>
      <StatusBar barStyle = "light-content" translucent = {true} backgroundColor="#00000099"/>
      {/* <Splash></Splash>*/}
      <Map></Map>
    </View>
  </>
;

const styles = StyleSheet.create({
  test: {
    backgroundColor: '#FE4963',
    color: colors.asphaltGray,
    ...typography.button,
  },
});

export default App;
