import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Config } from 'context';
import { TYPOGRAPHY, SHAPES, normalizeStyles } from 'res';

const SpeechBubble = ({
  content = 'Speech Bubble',
  elevation = SHAPES.elevGray2,
  wrapperStyle,
  flip = false,
}) => {
  const { COLORS } = useContext(Config.Context);
  const styles = generateStyles({ COLORS, flip, elevation });

  return (
    <View style={wrapperStyle}>
      <View style={styles.container}>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

const generateStyles = ({ COLORS, flip, elevation }) => (
  normalizeStyles({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: COLORS.basics.justWhite,
      borderTopLeftRadius: SHAPES.radiusLg,
      borderTopRightRadius: SHAPES.radiusLg,
      borderBottomRightRadius: flip ? SHAPES.radiusSm : SHAPES.radiusLg,
      borderBottomLeftRadius: flip ? SHAPES.radiusLg : SHAPES.radiusSm,
      ...elevation,
    },
    content: {
      color: COLORS.asphaltGray[800],
      ...TYPOGRAPHY.subheader3,
    },
  })
);

SpeechBubble.propTypes = {
  content: PropTypes.string.isRequired,
  elevation: PropTypes.object,
  wrapperStyle: PropTypes.object,
  flip: PropTypes.bool,
};

export default SpeechBubble;
