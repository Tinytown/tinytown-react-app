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
        keyColor={keyColor}
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => animateOnPress('in')}
        onPressOut={() => animateOnPress('out')}
      >
        <RadialGradient
          style={styles.blur}
          colors={[keyColor, 'transparent']}
          stops={[0.1, 0.95]}
          center={[160, 160]}
          radius={160}/>
        <Animated.View style={[styles.card, animation]} />
        <View style={styles.button} >
          <View style={styles.icon}>
            <Icon icon={icon} color={keyColor} />
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
  const  [backgroundTheme, keyColor, textTheme]  = getThemeStyles(disabled ? null : theme);

  return (
    normalizeStyles({
      container: {
        borderRadius: SHAPES.radiusMd,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 20,
        paddingVertical: 12,
        borderRadius: SHAPES.radiusMd,
        borderWidth: 2,
        ...backgroundTheme,
        ...(disabled && COLORS.disabled),
      },
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
        marginRight: 12,
      },
      label: {
        ...TYPOGRAPHY.subheader3,
        ...textTheme,
        ...(branded && TYPOGRAPHY.brandedButton),
      },
      card: {
        position: 'absolute',
        height: '100%',
        width: '80%',
        borderRadius: SHAPES.radiusMd,
        backgroundColor: keyColor,
        ...(disabled && { opacity: 0 }),
      },
      blur: {
        position: 'absolute',
        width: BLUR_SIZE,
        height: BLUR_SIZE,
        transform: [{ translateX: 40 }],
        opacity: 0.22,
      },
    })
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
