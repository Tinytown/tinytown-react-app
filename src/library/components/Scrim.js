import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';

const Scrim = (props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.scrim, { top: -insets.top, bottom: -insets.bottom }]} >
      {props.children}
    </View>
  );
};

export default Scrim;

const styles = StyleSheet.create({
  scrim: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

