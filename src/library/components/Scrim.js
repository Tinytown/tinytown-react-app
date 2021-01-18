import React from 'react';
import { View } from 'react-native';
import { create } from 'library/utils/normalize.js';

const Scrim = ({ children }) => {
  return (
    <View style={styles.scrim} >
      {children}
    </View>
  );
};

export default Scrim;

const styles = create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

