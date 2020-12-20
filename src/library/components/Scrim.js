import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { create } from 'library/utils/normalize.js';

const Scrim = (props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.scrim, { top: -insets.top, bottom: -insets.bottom }]} >
      {props.children}
    </View>
  );
};

export default Scrim;

const styles = create({
  scrim: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

