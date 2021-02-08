import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, TYPOGRAPHY, SHAPES, normalizeStyles } from 'res';

const SpeechBubble = ({
  content = 'Speech Bubble',
  wrapperStyle,
  flip = false,
}) => {
  const styles = generateStyles({ flip });

  return (
    <View style={wrapperStyle}>
      <View style={styles.container}>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>

  );
};

const generateStyles = ({ flip }) => (
  normalizeStyles({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: COLORS.justWhite,
      borderTopLeftRadius: SHAPES.radiusLg,
      borderTopRightRadius: SHAPES.radiusLg,
      borderBottomRightRadius: flip ? SHAPES.radiusSm : SHAPES.radiusLg,
      borderBottomLeftRadius: flip ? SHAPES.radiusLg : SHAPES.radiusSm,
      ...SHAPES.elevGray2,
    },
    content: {
      color: COLORS.asphaltGray800,
      ...TYPOGRAPHY.brandedButton,
    },
  })
);

SpeechBubble.propTypes = {
  content: PropTypes.string.isRequired,
  flip: PropTypes.bool,
};

export default SpeechBubble;
