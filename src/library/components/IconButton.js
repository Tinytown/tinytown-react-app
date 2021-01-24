import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Pressable } from 'library/components/hoc';
import { COLORS, SHAPES, Icon, normalizeStyles, getThemeStyles } from 'res';

const IconButton = ({
  icon,
  theme = null,
  onPress,
  wrapperStyle,
  disabled = false,
}) => {
  const superSize = theme?.includes('super');
  const styles = generateStyles({ superSize, theme, disabled });

  return (
    <View style={wrapperStyle} >
      <Pressable
        keyColor={keyColor}
        containerStyle={styles.container}
        disabled={disabled}
        onPress={onPress}
      >
        <View style={styles.button}>
          <View style={styles.icon}>
            <Icon icon={icon} color={styles.keyColor} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const generateStyles = ({ superSize, theme, disabled }) => {
  const SIZE = superSize ? 52 : 48;
  const BORDER = superSize ? 0 : 2;
  const [backgroundTheme, keyColor]  = getThemeStyles(disabled ? null : theme);

  return (
    { ...normalizeStyles({
      container: {
        borderRadius: SHAPES.radiusAll,
      },

      button: {
        height: SIZE,
        width: SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SHAPES.radiusAll,
        borderWidth: BORDER,
        ...backgroundTheme,
        ...(disabled && COLORS.disabled),
      },

      icon: {
        height: 24,
        width: 24,
      },
    }), keyColor }
  );
};

IconButton.propTypes = {
  icon: PropTypes.string,
  theme: PropTypes.oneOf(['green', 'blue', 'red', 'gray', 'super red']),
  onPress: PropTypes.func,
  wrapperStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

export default IconButton;
