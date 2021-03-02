import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Pressable } from 'library/components/hoc';
import { SHAPES, Icon, normalizeStyles, getThemeStyles, resolveTheme } from 'res';

const IconButton = ({
  icon,
  theme,
  wrapperStyle,
  disabled = false,
  onPress,
}) => {
  const styles = generateStyles({ theme, disabled });

  return (
    <View style={wrapperStyle} >
      <Pressable
        rippleColor={styles.rippleColor}
        disabled={disabled}
        onPress={onPress}
        containerStyle={styles.button}
      >
        <View style={styles.icon}>
          <Icon icon={icon} color={styles.iconColor} />
        </View>
      </Pressable>
    </View>
  );
};

const generateStyles = ({ theme, disabled }) => {
  const SIZE = 56;
  const resolvedTheme = resolveTheme(theme,  disabled);
  const { backgroundTheme, iconColor, rippleColor }  = getThemeStyles(resolvedTheme);

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
    }), iconColor, rippleColor }
  );
};

IconButton.propTypes = {
  icon: PropTypes.string,
  theme: PropTypes.oneOf(['lt-red-floating', 'lt-white-filled']),
  wrapperStyle: PropTypes.object,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default IconButton;
