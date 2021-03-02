import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { SHAPES, TYPOGRAPHY, Icon, normalizeStyles, getThemeStyles, resolveTheme } from 'res';

const PromoCard = ({
  title = 'Feature Title',
  body = 'Feature description',
  icon,
  theme = 'lt-white-hairline',
  wrapperStyle,
  disabled = false,
  children,
}) => {
  const styles = generateStyles({ theme, disabled });

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { disabled });
    }
    return child;
  });

  return (
    <View style={wrapperStyle}>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.icon}>
            <Icon icon={icon} color={styles.iconColor}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
          </View>
        </View>
        {childrenWithProps}
      </View>
    </View>
  );
};

const generateStyles = ({ theme, disabled }) => {
  const ICON_SIZE = 24;
  const resolvedTheme = resolveTheme({ theme,  disabled });
  const { backgroundTheme, iconColor, labelColor }  = getThemeStyles(resolvedTheme);

  return (
    { ...normalizeStyles({
      card: {
        borderRadius: SHAPES.radiusMd,
        ...backgroundTheme,
      },
      content: {
        padding: 14,
        flexDirection: 'row',
      },
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
      },
      textContainer: {
        marginLeft: 12,
        marginRight: 80,
      },
      title: {
        color: labelColor,
        ...TYPOGRAPHY.subheader3,
      },
      body: {
        marginTop: 2,
        color: labelColor,
        ...TYPOGRAPHY.body3,
      },
    }), iconColor }
  );
};

PromoCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['lt-white-hairline', 'lt-cyan-hairline']),
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default PromoCard;
