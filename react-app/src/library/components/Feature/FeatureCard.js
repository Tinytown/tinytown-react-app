import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Pressable from '../hoc/Pressable';
import Chip from '../Chip';
import { COLORS, SHAPES, TYPOGRAPHY, Icon, normalizeStyles, getThemeStyles } from 'res';

const FeatureCard = ({
  title = 'Feature Title',
  body = 'Feature description',
  icon,
  theme = 'hairline',
  activeColor = COLORS.justWhite,
  wrapperStyle,
  disabled = false,
  children,
  toggle = true,
}) => {
  const styles = generateStyles({ theme, activeColor, disabled, toggle });
  const { keyColor, contentColor, borderColor } = styles;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { theme, activeColor, keyColor, contentColor, borderColor });
    }
    return child;
  });

  return (
    <View style={wrapperStyle}>
      <Pressable containerStyle={styles.card} keyColor={activeColor}>
        <View style={styles.content}>
          <View style={styles.icon}>
            <Icon icon={icon} color={activeColor}/>
          </View>
          <View style={styles.text}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
          </View>
        </View>
        <Chip
          wrapperStyle={styles.chip}
          theme={toggle ? 'elevated' : 'hairline dark'}
          label='on'
          toggle={toggle}
          activeColor={activeColor}
        />
        {childrenWithProps}
      </Pressable>
    </View>
  );
};

const generateStyles = ({ theme, activeColor, disabled, toggle }) => {
  const ICON_SIZE = 24;
  const [backgroundTheme, keyColor, contentColor]  = getThemeStyles(disabled ? 'disabled' : theme);

  return (
    { ...normalizeStyles({
      card: {
        paddingVertical: 14,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: SHAPES.radiusMd,
        ...backgroundTheme,
        ...(toggle && { borderColor: activeColor }),
      },
      content: {
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
    }), keyColor, contentColor, borderColor: backgroundTheme.borderColor }
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
