import React from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Pressable } from 'library/components/hoc';
import { COLORS, TYPOGRAPHY, SHAPES, normalizeStyles } from 'res';

const Shout = React.memo(({
  label = 'Shout Label',
  onPress,
  showPin = true,
  local = false,
}) => {
  const styles = generateStyles({ local });

  return (
    <View style={styles.wrapper} pointerEvents='box-none' >
      <Pressable
        containerStyle={styles.container}
        onPress={onPress}
        keyColor={COLORS.justWhite}
      >
        {local && <ActivityIndicator size='small' color={COLORS.grassGreen400} />}
        <Text style={styles.label} numberOfLines={1} >{label}</Text>
        {showPin && <View style={styles.pin}/>}
      </Pressable>
    </View>
  );
});

const generateStyles = ({ local }) => {
  const WIDTH = 200;
  const PADDING = 8;
  const PIN_OFFSET = 14;
  const PIN_SIZE = 10;

  return (
    normalizeStyles({
      wrapper: {
        width: WIDTH,
        padding: PADDING,
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
        flexDirection: 'row',
        alignSelf: 'flex-start',
        maxWidth: WIDTH,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: SHAPES.radiusAll,
        backgroundColor: COLORS.asphaltGray800,
        ...SHAPES.elevGray2,
      },
      label: {
        flexShrink: 1,
        marginLeft: local ? PADDING : 0,
        color: COLORS.justWhite,
        ...TYPOGRAPHY.overline2,
      },
      pin: {
        position: 'absolute',
        width: PIN_SIZE,
        height: PIN_SIZE,
        bottom: -5,
        left: PIN_OFFSET,
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
  showPin: PropTypes.bool,
  local: PropTypes.bool,
};

export default Shout;
