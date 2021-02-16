import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { COLORS, normalizeStyles } from 'res';

const MenuDivider = ({
  color = COLORS.asphaltGray100,
  margin = 8,
}) => {
  const styles = generateStyles({ color, margin });

  return (
    <View style={[styles.divider, { borderBottomColor: color }]} />
  );
};

const generateStyles = ({ color, margin }) => (
  normalizeStyles({
    divider: {
      flex: 1,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: color,
      marginVertical: margin,
    },
  })
);

MenuDivider.propTypes = {
  color: PropTypes.string,
  margin: PropTypes.number,
};

export default MenuDivider;
