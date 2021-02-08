import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { COLORS, TYPOGRAPHY, SHAPES, normalizeStyles } from 'res';

const Shout = ({
  label = 'Shout Label',
  onPress,
}) => {
  const [wrapperLayout, setWrapperLayout] = useState(null);
  const styles = generateStyles({ wrapperLayout });

  const onLayoutHandler = ({ nativeEvent: { layout } }) => {
    setWrapperLayout(layout);
  };

  return (
    <View style={styles.wrapper} onLayout={onLayoutHandler} >
      <Pressable
        containerStyle={styles.container}
        onPress={onPress}
        keyColor={COLORS.justWhite}
      >
        <Text style={styles.label} numberOfLines={1} >{label}</Text>
        <View style={styles.pin} />
      </Pressable>
    </View>
  );
};

const generateStyles = ({ wrapperLayout }) => {
  const HORIZONTAL_PADDING = 12;
  const PIN_OFFSET = 14;
  const PIN_BORDER_WIDTH = 2;
  const MAX_WIDTH = 180;

  return (
    normalizeStyles({
      wrapper: {
        padding: 8,
        alignSelf: 'center',
        maxWidth: MAX_WIDTH,
        opacity: wrapperLayout ? 1 : 0,
        transform: wrapperLayout ? [
          { translateY: -(wrapperLayout.height / 2) + (PIN_BORDER_WIDTH / 2) },
          { translateX: wrapperLayout.width / 2 - HORIZONTAL_PADDING - PIN_OFFSET - PIN_BORDER_WIDTH / 2 },
        ] : [],
      },
      container: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: HORIZONTAL_PADDING,
        borderRadius: SHAPES.radiusAll,
        backgroundColor: COLORS.asphaltGray800,
        ...SHAPES.elevGray2,
      },
      label: {
        color: COLORS.justWhite,
        ...TYPOGRAPHY.overline2,
      },
      pin: {
        position: 'absolute',
        bottom: -5,
        left: PIN_OFFSET,
        width: 10,
        height: 10,
        borderRadius: SHAPES.radiusAll,
        borderColor: COLORS.asphaltGray800,
        borderWidth: PIN_BORDER_WIDTH,
        backgroundColor: COLORS.justWhite,
      },
    })
  );
};

Shout.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default Shout;
