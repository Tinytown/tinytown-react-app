import React from 'react';
import { View, StyleSheet } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import Map from 'library/components/Map';
import FAB from 'library/components/fab';
import R from 'res/R'

export default class LocationScreen extends React.Component {
  render () {
    return (
      <View style={styles.landscape}>
        <Map></Map>
        <View style={styles.safeArea} pointerEvents='box-none'>
          <View style={styles.fabContainer}>
            <FAB label={R.strings.button.gotoLocation} theme='green' icon='crosshairs' onPress={'TODO'}/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  landscape: {
    height: '100%'
  },
  safeArea: {
    position: 'absolute',
    width: '100%',
    bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    top: StaticSafeAreaInsets.safeAreaInsetsTop,
    alignItems: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
  }
});