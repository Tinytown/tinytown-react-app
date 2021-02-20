import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Pressable } from 'library/components/hoc';
import { SHAPES, Icon, normalizeStyles, getThemeStyles } from 'res';

const IconButton = ({
  icon,
  theme = null,
  wrapperStyle,
  disabled = false,
  onPress,
}) => {
  const styles = generateStyles({ theme, disabled });

  return (
    <View style={wrapperStyle} >
      <Pressable
        keyColor={styles.keyColor}
        disabled={disabled}
        onPress={onPress}
        containerStyle={styles.button}
      >
        <View style={styles.icon}>
          <Icon icon={icon} color={styles.contentColor} />
        </View>
      </Pressable>
    </View>
  );
};

const generateStyles = ({ theme, disabled }) => {
  const SIZE = 56;
  const [backgroundTheme, keyColor, contentColor]  = getThemeStyles(disabled ? 'disabled' : theme);

  return (
    { ...normalizeStyles({
      button: {
        height: SIZE,
        width: SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SHAPES.radiusAll,
        ...backgroundTheme,
      },
      icon: {
        height: 24,
        width: 24,
      },
    }), keyColor, contentColor }
  );
};

IconButton.propTypes = {
  icon: PropTypes.string,
  theme: PropTypes.oneOf(['cyan', 'blue', 'red', 'transparent', 'white']),
  wrapperStyle: PropTypes.object,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default IconButton;
