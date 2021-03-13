import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { COLORS, normalizeStyles } from 'res';

const MenuDivider = ({
  color = COLORS.asphaltGray[100],
  margin = 8,
}) => {
  const styles = generateStyles({ color, margin });

  return (
    <View style={styles.divider} />
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
