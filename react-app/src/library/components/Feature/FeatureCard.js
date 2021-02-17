import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, SHAPES, normalizeStyles, getThemeStyles } from 'res';

const FeatureCard = ({
  theme = 'hairline',
  activeColor = COLORS.justWhite,
  wrapperStyle,
  disabled = false,
  children,
}) => {
  const styles = generateStyles({ theme, activeColor, disabled });
  const { keyColor, contentColor } = styles;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { activeColor, keyColor, contentColor });
    }
    return child;
  });

  return (
    <View style={wrapperStyle} >
      <View style={styles.card} >
        {childrenWithProps}
      </View>
    </View>
  );
};

const generateStyles = ({ theme, activeColor, disabled }) => {
  const [backgroundTheme, keyColor, contentColor]  = getThemeStyles(disabled ? 'disabled' : theme);

  return (
    { ...normalizeStyles({
      card: {
        paddingVertical: 12,
        paddingLeft: 14,
        paddingRight: 12,
        borderRadius: SHAPES.radiusMd,
        ...backgroundTheme,
      },
    }), keyColor, contentColor }
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
