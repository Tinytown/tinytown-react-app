import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, SHAPES, normalizeStyles } from 'res';

const FeatureCard = ({
  children,
  keyColor = COLORS.asphaltGray50,
  wrapperStyle,
}) => {
  const styles = generateStyles({ keyColor });

  return (
    <View style={wrapperStyle} >
      <View style={styles.card} >
        {children}
      </View>
    </View>
  );
};

const generateStyles = ({ keyColor }) => (
  normalizeStyles({
    card: {
      paddingVertical: 12,
      paddingLeft: 14,
      paddingRight: 12,
      borderRadius: SHAPES.radiusMd,
      ...SHAPES.elevHairline,
      borderColor: keyColor,
    },
  }));

FeatureCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default FeatureCard;
