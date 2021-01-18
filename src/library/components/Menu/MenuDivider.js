import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, normalizeStyles } from 'res';

const MenuDivider = ({ color = COLORS.sidewalkGray }) => {
  return <View style={[styles.divider, { borderBottomColor: color }]} />;
};

const styles = normalizeStyles({
  divider: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 8,
  },
});

export default MenuDivider;
