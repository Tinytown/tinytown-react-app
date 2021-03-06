import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { Config } from 'context';
import { TYPOGRAPHY, Icon, normalizeStyles } from 'res';

const MenuItem = ({
  label = 'Menu item',
  primaryIcon,
  secondaryIcon,
  tall = false,
  disabled = false,
  onPress,
}) => {
  const { COLORS } = useContext(Config.Context);
  const styles = generateStyles({ COLORS, disabled, tall });

  return (
    <Pressable
      containerStyle={styles.container}
      disabled={disabled}
      onPress={onPress}
      rippleColor={COLORS.asphaltGray[800]}
    >
      <View style={styles.assetContainerLeft}>
        <View style={styles.iconContainer}>
          <Icon icon={primaryIcon} color={COLORS.asphaltGray[800]}/>
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
          <Icon icon={secondaryIcon} color={COLORS.asphaltGray[100]}/>
        </View>
      </View>
      }
    </Pressable>
  );
};

const generateStyles = ({ COLORS, disabled, tall }) => (
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
      color: COLORS.asphaltGray[800],
      ...TYPOGRAPHY.subheader3,
    },
  })
);

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  primaryIcon: PropTypes.string.isRequired,
  secondaryIcon: PropTypes.string,
  tall: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default MenuItem;
