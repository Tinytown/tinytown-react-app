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
  const styles = generateStyles({ theme, disabled });

  return (
    <View style={wrapperStyle} >
      <Pressable
        keyColor={styles.keyColor}
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

const generateStyles = ({ theme, disabled }) => {
  const SIZE = 56;
  const [backgroundTheme, keyColor]  = getThemeStyles(disabled ? 'disabled' : theme);

  return (
    { ...normalizeStyles({
      container: {
        borderRadius: SHAPES.radiusAll,
        ...backgroundTheme,
        ...(disabled && COLORS.disabled),
      },

      button: {
        height: SIZE,
        width: SIZE,
        justifyContent: 'center',
        alignItems: 'center',
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
  theme: PropTypes.oneOf(['cyan', 'blue', 'red', 'gray']),
  onPress: PropTypes.func,
  wrapperStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

export default IconButton;
