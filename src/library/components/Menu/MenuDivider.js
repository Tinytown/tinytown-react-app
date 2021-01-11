import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, normalizeStyles } from 'res';

function MenuDivider({ color }) {
  return <View style={[styles.divider, { borderBottomColor: color }]} />;
}

MenuDivider.defaultProps = {
  color: COLORS.sidewalkGray,
};

const styles = normalizeStyles({
  divider: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 8,
  },
});

export default MenuDivider;
