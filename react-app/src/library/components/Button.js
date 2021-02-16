import React from 'react';
import { View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { TYPOGRAPHY, SHAPES, Icon, normalizeStyles, getThemeStyles } from 'res';

const Button = ({
  icon,
  label = 'Button Label',
  theme = null,
  onPress,
  wrapperStyle,
  disabled = false,
}) => {
  const styles = generateStyles({ icon, theme, disabled });

  return (
    <View style={wrapperStyle} pointerEvents='box-none'>
      <Pressable
        animationType='press'
        containerStyle={styles.container}
        keyColor={styles.keyColor}
        disabled={disabled}
        onPress={onPress}
      >
        <View style={styles.button}>
          {icon &&
          <View style={styles.icon}>
            <Icon icon={icon} color={styles.contentColor} />
          </View>
          }
          <Text style={styles.label}>{label}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const generateStyles = ({ icon, theme, disabled }) => {
  const ICON_SIZE = 20;
  const  [backgroundTheme, keyColor, contentColor]  = getThemeStyles(disabled ? 'disabled' : theme);

  return (
    { ...normalizeStyles({
      container: {
        borderRadius: SHAPES.radiusSm,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        flexDirection: 'row',
        paddingHorizontal: icon ? 10 : 14,
        paddingVertical: 6,
        borderRadius: SHAPES.radiusSm,
        ...backgroundTheme,
      },
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
        marginRight: 8,
      },
      label: {
        marginTop: Platform.OS === 'android' ? 1 : 0,
        color: contentColor,
        ...TYPOGRAPHY.subheader4,
      },
    }), keyColor, contentColor }
  );
};

Button.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['white', 'hairline']),
  onPress: PropTypes.func,
  wrapperStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;
