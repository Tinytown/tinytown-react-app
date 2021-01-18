import React from 'react';
import { View } from 'react-native';
import { normalizeStyles } from 'res';

const Scrim = ({ children }) => {
  return (
    <View style={styles.scrim} >
      {children}
    </View>
  );
};

export default Scrim;

const styles = normalizeStyles({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

