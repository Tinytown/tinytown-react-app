import React from 'react';
import { View, StyleSheet } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import Map from 'library/components/Map';
import TwitterAuth from 'library/components/TwitterAuth'


const SignInScreen = () => {
  return (
    <View style={styles.landscape}>
      <Map></Map>
      <View style={styles.safeArea} pointerEvents='box-none'>
        <View style={styles.fabContainer}>
          <TwitterAuth />
        </View>
      </View>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  landscape: {
    height: '100%'
  },
  safeArea: {
    position: 'absolute',
    width: '100%',
    bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    top: StaticSafeAreaInsets.safeAreaInsetsTop,
    alignItems: 'center'
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24
  }
});