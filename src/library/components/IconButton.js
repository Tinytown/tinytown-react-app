import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Pressable } from 'library/components/hoc';
import { SHAPES, Icon, normalizeStyles, getThemeStyles } from 'res';

const IconButton = ({
  icon,
  theme = null,
  disabled = false,
  onPress,
  wrapperStyle,
}) => {
  const [backgroundTheme, keyColor]  = getThemeStyles(disabled ? null : theme);
  const buttonStyle = { ...styles.button, ...backgroundTheme, ...(disabled && COLORS.disabled) };

  return (
    <View style={wrapperStyle} >
      <Pressable
        keyColor={keyColor}
        containerStyle={styles.container}
        disabled={disabled}
        onPress={onPress}
      >
        <View style={buttonStyle}>
          <View style={styles.icon}>
            <Icon icon={icon} color={keyColor} />
          </View>
        </View>
      </Pressable>
    </View>

  );
};

IconButton.propTypes = {
  icon: PropTypes.string,
  theme: PropTypes.oneOf(['green', 'blue', 'red', 'gray']),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

const styles = normalizeStyles({
  container: {
    borderRadius: SHAPES.radiusAll,
  },

  button: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SHAPES.radiusAll,
    borderWidth: 2,
  },

  icon: {
    height: 24,
    width: 24,
  },

});

export default IconButton;
