import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Pressable from './hoc/Pressable';
import { SHAPES, TYPOGRAPHY, Icon, normalizeStyles, getThemeStyles } from 'res';

const FAB = ({ icon, label, theme, branded, disabled, onPress }) => {
  const { backgroundTheme, shadowTheme, iconTheme, textTheme } = getThemeStyles(theme);

  const containerStyle = { ...styles.container, ...backgroundTheme };
  const labelStyle = [styles.label, textTheme, branded && styles.labelBranded]

  return (
    <Pressable
      animationType='bounce'
      containerStyle={containerStyle}
      shadowStyle={shadowTheme}
      disabled={disabled}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Icon icon={icon} color={iconTheme} />
      </View>
      <Text style={labelStyle}>{label}</Text>
    </Pressable>
  )
}

const styles = normalizeStyles({
  container: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 20,
    paddingVertical: 12,
    overflow: 'hidden',
    borderRadius: SHAPES.radiusAll,
  },

  label: {
    ...TYPOGRAPHY.subheader3,
  },

  labelBranded: {
    ...TYPOGRAPHY.brandedButton,
  },

  iconContainer: {
    height: 24,
    width: 24,
    marginRight: 12,
  },
});

FAB.propTypes = {
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['green', 'blue', 'red']),
  branded: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

FAB.defaultProps = {
  label: 'Button Label',
  theme: null,
  branded: false,
  onPress: () => console.log('Pass an onPress callback to this component'),
  disabled: false,
};

export default FAB;
