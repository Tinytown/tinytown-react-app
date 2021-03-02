import React from 'react';
import { View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { TYPOGRAPHY, SHAPES, Icon, normalizeStyles, getThemeStyles, resolveTheme } from 'res';

const Button = ({
  icon,
  label = 'Button Label',
  theme = null,
  wrapperStyle,
  disabled = false,
  onPress,
}) => {
  const styles = generateStyles({ icon, theme, disabled });

  return (
    <View style={wrapperStyle} pointerEvents='box-none'>
      <Pressable
        animationType='press'
        containerStyle={styles.container}
        rippleColor={styles.rippleColor}
        disabled={disabled}
        onPress={onPress}
      >
        <View style={styles.button}>
          {icon &&
            <View style={styles.icon}>
              <Icon icon={icon} color={styles.iconColor} />
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
  const resolvedTheme = resolveTheme({ theme, disabled });
  const  { backgroundTheme, iconColor, labelColor, rippleColor }  = getThemeStyles(resolvedTheme);

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
        color: labelColor,
        ...TYPOGRAPHY.subheader4,
      },
    }), iconColor, rippleColor }
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['lt-cyan-raised']),
  wrapperStyle: PropTypes.object,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Button;
