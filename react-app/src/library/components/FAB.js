import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import RadialGradient from 'react-native-radial-gradient';
import { Pressable } from 'library/components/hoc';
import { COLORS, TYPOGRAPHY, SHAPES, Icon, normalizeStyles, getThemeStyles } from 'res';
import { useAnimation } from 'library/hooks';

const FAB = ({
  icon,
  label = 'Button Label',
  theme = null,
  branded = false,
  onPress,
  wrapperStyle,
  disabled = false,
}) => {
  const [animation, animateOnPress] = useAnimation('jiggle');
  const styles = generateStyles({ theme, branded, disabled });

  return (
    <View style={wrapperStyle} pointerEvents='box-none'>
      <Pressable
        animationType='press'
        containerStyle={styles.container}
        keyColor={styles.keyColor}
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => animateOnPress('in')}
        onPressOut={() => animateOnPress('out')}
      >
        <RadialGradient
          style={styles.blur}
          colors={[styles.keyColor, 'transparent']}
          stops={[0.1, 0.95]}
          center={[160, 160]}
          radius={160}/>
        <Animated.View style={[styles.card, animation]} />
        <View style={styles.button} >
          <View style={styles.icon}>
            <Icon icon={icon} color={styles.contentColor} />
          </View>
          <Text style={styles.label}>{label}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const generateStyles = ({ theme, branded, disabled }) => {
  const ICON_SIZE  = 24;
  const BLUR_SIZE = 320;
  const  [backgroundTheme, keyColor, contentColor]  = getThemeStyles(disabled ? 'disabled' : theme);

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
        color: contentColor,
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
      blur: {
        position: 'absolute',
        width: BLUR_SIZE,
        height: BLUR_SIZE,
        transform: [{ translateX: 40 }],
        opacity: 0.22,
      },
    }), keyColor, contentColor }
  );
};

FAB.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['cyan', 'blue', 'red']),
  branded: PropTypes.bool,
  onPress: PropTypes.func,
  wrapperStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

export default FAB;
