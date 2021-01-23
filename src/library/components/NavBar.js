import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { COLORS, TYPOGRAPHY, normalizeStyles } from 'res';

const NavBar = ({
  label = 'Label',
  onClose = () => console.log('Pass an onClose callback to this component'),
  children,
}) => (
  <View style={styles.container}>
    <View style={styles.leftSide}>
      <IconButton icon='close' theme='gray' onPress={onClose}/>
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={styles.rightSide}>
      {children}
    </View>
  </View>
);

const styles = normalizeStyles({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 56,
    paddingHorizontal: 4,
  },

  leftSide: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  rightSide: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },

  label: {
    marginLeft: 12,
    marginTop: 1,
    color: COLORS.asphaltGray,
    ...TYPOGRAPHY.headline5,
  },
});

NavBar.propTypes = {
  label: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.element,
};

export default NavBar;
