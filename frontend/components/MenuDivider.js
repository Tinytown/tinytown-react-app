import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../styles'

function MenuDivider({ color }) {
  return <View style={[styles.divider, { borderBottomColor: color }]} />;
}

MenuDivider.defaultProps = {
  color: colors.sidewalkGray,
};

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 8
  },
});

export default MenuDivider;
