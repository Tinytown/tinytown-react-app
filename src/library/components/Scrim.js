import React from 'react';
import { View } from 'react-native';
import { create } from 'library/utils/normalize.js';

const Scrim = (props) => {
  return (
    <View style={styles.scrim} >
      {props.children}
    </View>
  );
};

export default Scrim;

const styles = create({
  scrim: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

