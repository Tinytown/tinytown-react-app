import React from 'react';
import { Pressable } from './hoc';
import { normalizeStyles } from 'res';

const Scrim = ({ children, onPress, animationStyle }) => (
  <Pressable
    containerStyle={styles.scrim}
    animationStyle={animationStyle}
    ripple={false}
    onPress={onPress} >
    {children}
  </Pressable>
);

export default Scrim;

const styles = normalizeStyles({
  scrim: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

