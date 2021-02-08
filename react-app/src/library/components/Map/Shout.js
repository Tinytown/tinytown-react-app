import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { COLORS, TYPOGRAPHY, SHAPES, normalizeStyles } from 'res';

const Shout = React.memo(({
  label = 'Shout Label',
  onPress,
  onLayout,
  styleOffset = { WRAPPER_PADDING: 8, PIN_OFFSET: 14 },
}) => {
  const [wrapperLayout, setWrapperLayout] = useState(null);
  const styles = generateStyles({ wrapperLayout, styleOffset });

  const onLayoutHandler = ({ nativeEvent: { layout } }) => {
    setWrapperLayout(layout);
    onLayout && onLayout(layout);
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
});

const generateStyles = ({ wrapperLayout, styleOffset: { PIN_OFFSET, WRAPPER_PADDING } }) => {
  const MAX_WIDTH = 240;

  return (
    normalizeStyles({
      wrapper: {
        padding: WRAPPER_PADDING,
        alignSelf: 'center',
        maxWidth: MAX_WIDTH,
        opacity: wrapperLayout ? 1 : 0,
      },
      container: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 12,
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
        borderWidth: 2,
        backgroundColor: COLORS.justWhite,
      },
    })
  );
};

Shout.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  onLayout: PropTypes.func,
  styleOffset: PropTypes.object,
};

export default Shout;
