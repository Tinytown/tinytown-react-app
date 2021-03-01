import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { Pressable } from 'library/components/hoc';
import { useAnimation } from 'library/hooks';
import { COLORS, TYPOGRAPHY, SHAPES, Icon, normalizeStyles, getThemeStyles } from 'res';

const FAB = ({
  icon,
  label = 'Button Label',
  theme = null,
  wrapperStyle,
  branded = false,
  disabled = false,
  onPress,
}) => {
  const [animation, animateOnPress] = useAnimation('jiggle');
  const styles = generateStyles({ theme, branded, disabled });

  return (
    <View style={wrapperStyle} pointerEvents='box-none'>
      <Pressable
        animationType='press'
        containerStyle={styles.container}
        rippleColor={styles.rippleColor}
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => animateOnPress('in')}
        onPressOut={() => animateOnPress('out')}
      >
        <Animated.View style={[styles.card, animation]} />
        <View style={styles.button}>
          <View style={styles.icon}>
            <Icon icon={icon} color={styles.iconColor} />
          </View>
          <Text style={styles.label}>{label}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const generateStyles = ({ theme, branded, disabled }) => {
  const ICON_SIZE = 24;
  const  { backgroundTheme, iconColor, labelColor, rippleColor }  = getThemeStyles(disabled ? 'disabled' : theme);

  return (
    { ...normalizeStyles({
      container: {
        borderRadius: SHAPES.radiusMd,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        flexDirection: 'row',
        paddingLeft: 14,
        paddingRight: 18,
        paddingVertical: 10,
        borderRadius: SHAPES.radiusMd,
        ...backgroundTheme,
      },
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
        marginRight: 12,
      },
      label: {
        color: labelColor,
        ...TYPOGRAPHY.subheader3,
        ...(branded && TYPOGRAPHY.brandedButton),
      },
      card: {
        position: 'absolute',
        height: '100%',
        width: '80%',
        borderRadius: SHAPES.radiusMd,
        backgroundColor: COLORS.asphaltGray800,
        ...(disabled && { opacity: 0 }),
      },
    }), iconColor, rippleColor }
  );
};

FAB.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['red raised']),
  wrapperStyle: PropTypes.object,
  branded: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default FAB;
