import React from 'react';
import PropTypes from 'prop-types';
import { Pressable } from './hoc';
import { normalizeStyles } from 'res';

const Scrim = ({
  animationStyle,
  onPress = () => console.log('Pass an onPress callback to this component'),
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
  animationStyle: PropTypes.object,
  onPress: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default Scrim;
