import React from 'react';
import { StyleSheet, View } from 'react-native';
import { normalizeStyles } from 'res/functions';
import RES from 'res';

function MenuDivider({ color }) {
  return <View style={[styles.divider, { borderBottomColor: color }]} />;
}

MenuDivider.defaultProps = {
  color: RES.COLORS.sidewalkGray,
};

const styles = normalizeStyles({
  divider: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 8,
  },
});

export default MenuDivider;
