import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { COLORS, normalizeStyles } from 'res';

const MenuDivider = ({ color = COLORS.sidewalkGray }) => (
  <View style={[styles.divider, { borderBottomColor: color }]} />
);

const styles = normalizeStyles({
  divider: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 8,
  },
});

MenuDivider.propTypes = {
  color: PropTypes.string,
};

export default MenuDivider;
