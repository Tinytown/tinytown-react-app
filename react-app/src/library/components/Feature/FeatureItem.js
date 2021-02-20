import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Pressable from '../hoc/Pressable';
import Chip from '../Chip';
import { TYPOGRAPHY, STRINGS, Icon, normalizeStyles, getThemeStyles } from 'res';

const FeatureItem = ({
  title,
  icon,
  theme,
  activeColor,
  disabled = false,
  toggle = false,
  onPress = () => console.log('Pass an onPress callback to this component'),
}) => {
  const styles = generateStyles({ theme, disabled });
  const { on, off } = STRINGS.core;

  return (
    <>
      <View style={styles.divider}/>
      <Pressable
        containerStyle={styles.content}
        keyColor={activeColor}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.icon}>
          <Icon icon={icon} color={activeColor}/>
        </View>
        <Text style={styles.title} >{title}</Text>
        <Chip
          wrapperStyle={styles.chip}
          theme={toggle ? 'elevated' : 'hairline dark'}
          label={toggle ? on : off}
          toggle={toggle}
          activeColor={activeColor}
        />
      </Pressable>
    </>
  );
};

const generateStyles = ({ theme, disabled }) => {
  const ICON_SIZE = 24;
  const [backgroundTheme, keyColor]  = getThemeStyles(theme);

  return (
    normalizeStyles({
      divider: {
        height: 2,
        backgroundColor: backgroundTheme.borderColor,
      },
      content: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 14,
        alignItems: 'center',
        ...(disabled && { opacity: 0.4 }),
      },
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
      },
      title: {
        marginLeft: 12,
        color: keyColor,
        ...TYPOGRAPHY.subheader4,
      },
      chip: {
        position: 'absolute',
        right: 14,
      },
    })
  );
};

FeatureItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['hairline dark', 'elevated']),
  activeColor: PropTypes.string,
  disabled: PropTypes.bool,
  toggle: PropTypes.bool,
  onPress: PropTypes.func,
};

export default FeatureItem;
