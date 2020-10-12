/* Menu Divider Component
This component is a customized version of the Menu Divider component from react-native-material-menu [https://github.com/mxck/react-native-material-menu].*/

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
