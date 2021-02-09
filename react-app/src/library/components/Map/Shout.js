import React from 'react';
import { View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { COLORS, TYPOGRAPHY, SHAPES, normalizeStyles } from 'res';

const Shout = React.memo(({
  label = 'Shout Label',
  onPress,
  showPin = true,
}) => {
  const styles = generateStyles();

  return (
    <View style={styles.wrapper}>
      <Pressable
        containerStyle={styles.container}
        onPress={onPress}
        keyColor={COLORS.justWhite}
      >
        <Text style={styles.label} numberOfLines={1} >{label}</Text>
        {showPin && <View style={styles.pin}/>}
      </Pressable>
    </View>
  );
});

const generateStyles = () => {
  const WIDTH = 240;
  const PADDING = 8;
  const PIN_OFFSET = 14;
  const PIN_SIZE = 10;

  return (
    normalizeStyles({
      wrapper: {
        padding: PADDING,
        width: WIDTH,
        backgroundColor: 'transparent', // fix Android clipping bug

        // Adjust marker anchor for iOS (this doesn't work reliably for Android)
        ...(Platform.OS === 'ios' && {
          transform: [
            { translateX: WIDTH / 2 - PADDING - PIN_OFFSET - PIN_SIZE / 2 },
            { translateY: -16 },
          ],
        }),
      },
      container: {
        alignSelf: 'flex-start',
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
        width: PIN_SIZE,
        height: PIN_SIZE,
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
