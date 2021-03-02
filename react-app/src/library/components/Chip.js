import React from 'react';
import { View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { TYPOGRAPHY, SHAPES, Icon, normalizeStyles, getThemeStyles } from 'res';

const Chip = ({
  icon,
  label = 'Chip Label',
  theme = 'lt-white-hairline',
  wrapperStyle,
  animationType = 'press',
  ripple = true,
  disabled = false,
  toggle = false,
  onPress = () => {},
}) => {
  const styles = generateStyles({ theme, disabled, toggle });

  return (
    <View style={wrapperStyle} >
      <Pressable
        animationType={animationType}
        containerStyle={styles.container}
        rippleColor={styles.rippleColor}
        disabled={disabled}
        ripple={ripple}
        onPress={onPress}
      >
        {icon &&
        <View style={styles.icon}>
          <Icon icon={icon} color={styles.iconColor} />
        </View>
        }
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
};

const generateStyles = ({ theme, disabled }) => {
  const ICON_SIZE  = 16;
  const  { backgroundTheme, iconColor, labelColor, rippleColor }  = getThemeStyles(disabled ? 'lt-disabled' : theme);

  return (
    { ...normalizeStyles({
      container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: SHAPES.radiusAll,
        ...backgroundTheme,
      },
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
        marginRight: 8,
      },
      label: {
        marginTop: Platform.OS === 'android' ? 1 : 0,
        color: labelColor,
        ...TYPOGRAPHY.overline3,
      },
    }), iconColor, rippleColor }
  );
};

Chip.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf([
    'lt-red-raised',
    'lt-red-floating',
    'lt-red-hairline',
    'lt-blue-hairline',
    'lt-white-hairline',
    'dt-gray-hairline',
  ]),
  wrapperStyle: PropTypes.object,
  animationType: PropTypes.string,
  disabled: PropTypes.bool,
  ripple: PropTypes.bool,
  toggle: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Chip;
