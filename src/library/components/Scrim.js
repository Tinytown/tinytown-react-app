import React from 'react';
import PropTypes from 'prop-types';
import { Pressable } from './hoc';
import { normalizeStyles } from 'res';

const Scrim = ({
  onPress = () => console.log('Pass an onPress callback to this component'),
  animationStyle,
  children,
}) => (
  <Pressable
    containerStyle={styles.scrim}
    animationStyle={animationStyle}
    ripple={false}
    onPress={onPress} >
    {children}
  </Pressable>
);

const styles = normalizeStyles({
  scrim: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

Scrim.propTypes = {
  onPress: PropTypes.func,
  animationStyle: PropTypes.object,
  children: PropTypes.element,
};

export default Scrim;
