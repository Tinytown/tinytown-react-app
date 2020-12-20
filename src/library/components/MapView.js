import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { create } from 'library/utils/normalize.js';
import { WorldMap } from 'library/components';
import RES from 'res';

const MapView = (props) => {
  return (
    <View style={styles.landscape}>
      <WorldMap/>
      <SafeAreaView style={styles.safeArea} mode="margin" pointerEvents='box-none'>
        {props.children}
      </SafeAreaView>
    </View>
  );
};

export default MapView;

const styles = create({
  landscape: {
    height: '100%',
    backgroundColor: RES.COLORS.asphaltGray,
  },
  safeArea: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    alignItems: 'center',
  },
});
