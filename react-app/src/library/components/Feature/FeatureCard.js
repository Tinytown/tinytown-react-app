import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Pressable from '../hoc/Pressable';
import Chip from '../Chip';
import { COLORS, SHAPES, TYPOGRAPHY, STRINGS, Icon, normalizeStyles, getThemeStyles } from 'res';

const FeatureCard = ({
  title = 'Feature Title',
  body = 'Feature description',
  icon,
  theme = 'hairline',
  activeColor = COLORS.justWhite,
  wrapperStyle,
  disabled = false,
  children,
  toggle = false,
  onPress = () => console.log('Pass an onPress callback to this component'),
}) => {
  const styles = generateStyles({ theme, activeColor, disabled, toggle });
  const { on, off } = STRINGS.core;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { theme, activeColor, disabled: !toggle });
    }
    return child;
  });

  return (
    <View style={wrapperStyle}>
      <View style={styles.card} >
        <Pressable containerStyle={styles.content} keyColor={activeColor} onPress={onPress}>
          <View style={styles.icon}>
            <Icon icon={icon} color={activeColor}/>
          </View>
          <View style={styles.text}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
          </View>
          <Chip
            wrapperStyle={styles.chip}
            theme={toggle ? 'elevated' : 'hairline dark'}
            label={toggle ? on : off}
            toggle={toggle}
            activeColor={activeColor}
          />
        </Pressable>
        {childrenWithProps}
      </View>
    </View>
  );
};

const generateStyles = ({ theme, activeColor, disabled, toggle }) => {
  const ICON_SIZE = 24;
  const [backgroundTheme, keyColor, contentColor]  = getThemeStyles(disabled ? 'disabled' : theme);

  return (
    { ...normalizeStyles({
      card: {
        borderRadius: SHAPES.radiusMd,
        ...backgroundTheme,
        ...(toggle && { borderColor: activeColor }),
      },
      content: {
        padding: 14,
        flexDirection: 'row',
      },
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
      },
      text: {
        marginLeft: 12,
      },
      title: {
        color: keyColor,
        ...TYPOGRAPHY.subheader3,
      },
      body: {
        marginTop: 2,
        color: contentColor,
        maxWidth: 240,
        ...TYPOGRAPHY.body3,
      },
      chip: {
        position: 'absolute',
        top: 14,
        right: 14,
      },
    }) }
  );
};

FeatureCard.propTypes = {
  theme: PropTypes.oneOf(['hairline', 'hairline dark']),
  activeColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default FeatureCard;
