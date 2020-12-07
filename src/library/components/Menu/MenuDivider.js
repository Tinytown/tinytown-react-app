import React from 'react';
import { StyleSheet, View } from 'react-native';
import { create } from 'library/utils/normalize.js'
import RES from 'res';

function MenuDivider({ color }) {
  return <View style={[styles.divider, { borderBottomColor: color }]} />;
}

MenuDivider.defaultProps = {
  color: RES.COLORS.sidewalkGray,
};

const styles = create({
  divider: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 8,
  },
});

export default MenuDivider;
