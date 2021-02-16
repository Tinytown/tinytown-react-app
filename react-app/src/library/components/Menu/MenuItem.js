import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { COLORS, TYPOGRAPHY, Icon, normalizeStyles } from 'res';

const MenuItem = ({
  primaryIcon,
  secondaryIcon,
  label = 'Menu item',
  onPress,
  disabled = false,
  tall = false,
}) => {
  const styles = generateStyles({ disabled, tall });

  return (
    <Pressable
      containerStyle={styles.container}
      disabled={disabled}
      onPress={onPress}
      keyColor={COLORS.asphaltGray800}
    >
      <View style={styles.assetContainerLeft}>
        <View style={styles.iconContainer}>
          <Icon icon={primaryIcon} color={COLORS.asphaltGray800}/>
        </View>
      </View>
      <Text
        numberOfLines={1}
        style={styles.label}
      >
        {label}
      </Text>
      {secondaryIcon &&
      <View style={styles.assetContainerRight}>
        <View style={styles.iconContainer}>
          <Icon icon={secondaryIcon} color={COLORS.asphaltGray100}/>
        </View>
      </View>
      }
    </Pressable>
  );
};

const generateStyles = ({ disabled, tall }) => (
  normalizeStyles({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: tall ? 64 : 48,
      paddingLeft: 8,
      paddingRight: 56,
      ...(disabled && { opacity: 0.4 }),
    },
    assetContainerLeft: {
      alignItems: 'center',
      width: 48,
      marginRight: 8,
    },
    assetContainerRight: {
      position: 'absolute',
      alignItems: 'center',
      right: 8,
      width: 48,
    },
    iconContainer: {
      width: 24,
      height: 24,
    },
    label: {
      color: COLORS.asphaltGray800,
      ...TYPOGRAPHY.subheader3,
    },
  })
);

MenuItem.propTypes = {
  primaryIcon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  tall: PropTypes.bool,
};

export default MenuItem;
