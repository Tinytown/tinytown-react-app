import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { COLORS, TYPOGRAPHY, Icon, normalizeStyles } from 'res';

const MenuItem = ({
  icon,
  label = 'Menu item',
  onPress,
  disabled = false,
}) => {
  const styles = generateStyles({ disabled });

  return (
    <Pressable
      containerStyle={styles.container}
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
  );
};

const generateStyles = ({ disabled }) => {
  return (
    normalizeStyles({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        width: 200,
        paddingHorizontal: 8,
        ...(disabled && COLORS.disabled),
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
    })
  );
};

MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default MenuItem;