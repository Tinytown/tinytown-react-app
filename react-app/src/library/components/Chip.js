import React from 'react';
import { View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { COLORS, TYPOGRAPHY, SHAPES, Icon, normalizeStyles, getThemeStyles } from 'res';

const Chip = ({
  icon,
  label = 'Chip Label',
  theme = 'hairline',
  activeColor = COLORS.justWhite,
  wrapperStyle,
  animationType = 'press',
  ripple = true,
  disabled = false,
  toggle = false,
  onPress = () => {},
}) => {
  const styles = generateStyles({ theme, activeColor, disabled, toggle });

  return (
    <View style={wrapperStyle} >
      <Pressable
        animationType={animationType}
        containerStyle={styles.container}
        keyColor={styles.keyColor}
        disabled={disabled}
        ripple={ripple}
        onPress={onPress}
      >
        {icon &&
        <View style={styles.icon}>
          <Icon icon={icon} color={styles.contentColor} />
        </View>
        }
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
};

const generateStyles = ({ theme, activeColor, disabled, toggle }) => {
  const ICON_SIZE  = 16;
  const  [backgroundTheme, keyColor, contentColor]  = getThemeStyles(disabled ? 'disabled' : theme);

  return (
    { ...normalizeStyles({
      container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: SHAPES.radiusAll,
        ...backgroundTheme,
        ...(toggle && {
          backgroundColor: activeColor,
          shadowColor: activeColor,
          borderColor: activeColor,
        }),
      },
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
        marginRight: 8,
      },
      label: {
        marginTop: Platform.OS === 'android' ? 1 : 0,
        color: contentColor,
        ...TYPOGRAPHY.overline3,
      },
    }), keyColor, contentColor }
  );
};

Chip.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['cyan', 'blue', 'red', 'hairline', 'hairline red', 'hairline dark', 'elevated']),
  wrapperStyle: PropTypes.object,
  animationType: PropTypes.string,
  disabled: PropTypes.bool,
  ripple: PropTypes.bool,
  toggle: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Chip;
