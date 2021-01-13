import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Pressable from './hoc/Pressable';
import { COLORS, SHAPES, TYPOGRAPHY, Icon, normalizeStyles, getThemeStyles } from 'res';

const FAB = ({
  icon,
  label = 'Button Label',
  theme = null,
  branded = false,
  disabled = false,
  onPress,
}) => {
  const  [backgroundTheme, keyColor, textTheme]  = getThemeStyles(disabled ? null : theme);

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
    >
      <View style={cardStyle} />
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
    borderRadius: SHAPES.radiusSm,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 20,
    paddingVertical: 8,
    borderRadius: SHAPES.radiusSm,
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
    width: '85%',
    transform: [{ rotateZ: '6deg' }],
    borderRadius: SHAPES.radiusSm,
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
