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

const App = () =>
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <Splash></Splash>
    </SafeAreaView>
  </>
;

const styles = StyleSheet.create({
});

export default App;
