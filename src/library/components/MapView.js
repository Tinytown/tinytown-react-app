import React from 'react';
import { View, StyleSheet } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import Map from 'library/components/Map'
import R from 'res/R'

const MapView = (props) => {
  return (
    <View style={styles.landscape}>
      <Map/>
      <View style={styles.safeArea} pointerEvents='box-none'>
        {props.children}
      </View>
    </View>
  )
  }

export default MapView;

const styles = StyleSheet.create({
  landscape: {
    height: '100%',
    backgroundColor: R.colors.asphaltGray
  },
  safeArea: {
    position: 'absolute',
    width: '100%',
    bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    top: StaticSafeAreaInsets.safeAreaInsetsTop,
    alignItems: 'center',
  },
});