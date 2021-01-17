import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Pressable from '../hoc/Pressable';
import { COLORS, TYPOGRAPHY, Icon, normalizeStyles } from 'res';

const MenuItem = ({
  icon,
  label = 'Menu item',
  disabled = false,
  onPress,
}) => {
  const containerStyle = { ...styles.container, ...(disabled && COLORS.disabled) };

  return (
    <Pressable
      containerStyle={containerStyle}
      disabled={disabled}
      onPress={onPress}
      keyColor={COLORS.asphaltGray}
    >
      <View style={styles.assetContainer}>
        <View style={styles.iconContainer}>
          <Icon icon={icon} color={COLORS.graniteGray}/>
        </View>
      </View>
      <Text
        numberOfLines={1}
        style={styles.label}
      >
        {label}
      </Text>
    </Pressable>
  )
}

const styles = normalizeStyles({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    width: 200,
    paddingHorizontal: 8,
  },

  assetContainer: {
    alignItems: 'center',
    width: 48,
    marginRight: 8,
  },

  iconContainer: {
    width: 24,
    height: 24,
  },

  label: {
    width: 120,
    color: COLORS.graniteGray,
    ...TYPOGRAPHY.subheader3,
  },
});

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
}

export default MenuItem;
