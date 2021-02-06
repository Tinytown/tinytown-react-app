import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { TYPOGRAPHY, SHAPES, Icon, normalizeStyles, getThemeStyles } from 'res';

const Chip = ({
  icon,
  label = 'Chip Label',
  theme = null,
  onPress,
  wrapperStyle,
  animationType = 'press',
  disabled = false,
  ripple = true,
}) => {
  const styles = generateStyles({ disabled, theme });

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

const generateStyles = ({ theme, disabled }) => {
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
      },
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
        marginRight: 8,
      },
      label: {
        color: contentColor,
        ...TYPOGRAPHY.overline3,
      },
    }), keyColor }
  );
};

Chip.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['cyan', 'blue', 'red']),
  onPress: PropTypes.func,
  wrapperStyle: PropTypes.object,
  animationType: PropTypes.string,
  disabled: PropTypes.bool,
  ripple: PropTypes.bool,
};

export default Chip;
