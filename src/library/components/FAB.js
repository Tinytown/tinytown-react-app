import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import RadialGradient from 'react-native-radial-gradient';
import Pressable from './hoc/Pressable';
import { COLORS, SHAPES, TYPOGRAPHY, Icon, normalizeStyles, getThemeStyles } from 'res';
import { useAnimation } from 'library/hooks';

const FAB = ({
  icon,
  label = 'Button Label',
  theme = null,
  branded = false,
  disabled = false,
  onPress,
}) => {
  const  [backgroundTheme, keyColor, textTheme]  = getThemeStyles(disabled ? null : theme);
  const [animation, animateOnPress] = useAnimation('jiggle');

  const buttonStyle = { ...styles.button, ...backgroundTheme, ...(disabled && COLORS.disabled) };
  const labelStyle = { ...TYPOGRAPHY.subheader3, ...textTheme, ...(branded && TYPOGRAPHY.brandedButton) }
  const cardStyle = { ...styles.card, backgroundColor: keyColor, ...(disabled && { opacity: 0 }) }

  return (
    <Pressable
      animationType='bounce'
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
      <Animated.View style={[cardStyle, animation]} />
      <View style={buttonStyle} >
        <View style={styles.iconContainer}>
          <Icon icon={icon} color={keyColor} />
        </View>
        <Text style={labelStyle}>{label}</Text>
      </View>

    </Pressable>
  )
}

const styles = normalizeStyles({
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
  },
  iconContainer: {
    height: 24,
    width: 24,
    marginRight: 12,
  },
  card: {
    position: 'absolute',
    height: '100%',
    width: '80%',
    borderRadius: SHAPES.radiusMd,
  },
  blur: {
    width: 320,
    height: 320,
    position: 'absolute',
    left: 0,
    opacity: 0.22,
  },
});

FAB.propTypes = {
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['green', 'blue', 'red']),
  branded: PropTypes.bool,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
}

export default FAB;
