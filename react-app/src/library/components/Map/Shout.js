import React, { useEffect, useState } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { Pressable } from 'library/components/hoc';
import { useAnimation } from 'library/hooks';
import { COLORS, TYPOGRAPHY, SHAPES, normalizeStyles, getThemeStyles, resolveTheme } from 'res';

const Shout = React.memo(({
  label = 'Shout Label',
  theme = 'dt-gray-raised',
  shake = false,
  showPin = true,
  local = false,
  opened = false,
  disabled = false,
  onPress,
}) => {
  const [pressed, setPressed] = useState(false);
  const [animation] = useAnimation('ring', !pressed && shake);
  const styles = generateStyles({ local, opened, theme, disabled });

  const onPressHandler = () => {
    onPress();
    setPressed(true);
  };

  return (
    <View style={styles.wrapper} pointerEvents='box-none' >
      <Animated.View style={animation} >
        <Pressable
          containerStyle={styles.container}
          onPress={onPressHandler}
          rippleColor={styles.rippleColor}
          disabled={disabled}
        >
          {local && <ActivityIndicator size='small' color={COLORS.grassGreen400} />}
          <Text style={styles.label} numberOfLines={1} >{label}</Text>
          {showPin && <View style={styles.pin}/>}
        </Pressable>
      </Animated.View>
    </View>
  );
});

const generateStyles = ({ local, opened, theme, disabled }) => {
  const WIDTH = 200;
  const PADDING = 16;
  const PIN_OFFSET = 14;
  const PIN_SIZE = 10;
  const resolvedTheme = resolveTheme(theme,  disabled);
  const  {
    backgroundTheme,
    labelColor,
    rippleColor,
    auxColor1,
    auxColor2,
  }  = getThemeStyles(resolvedTheme);

  return (
    { ...normalizeStyles({
      wrapper: {
        width: WIDTH,
        padding: PADDING,
        backgroundColor: 'transparent', // fix Android clipping bug
        // adjust marker anchor for iOS (this doesn't work reliably for Android)
        ...(Platform.OS === 'ios' && {
          transform: [
            { translateX: WIDTH / 2 - PADDING - PIN_OFFSET - PIN_SIZE / 2 },
            { translateY: -24 },
          ],
        }),
      },
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        maxWidth: WIDTH,
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: SHAPES.radiusAll,
        ...backgroundTheme,
      },
      label: {
        flexShrink: 1,
        marginLeft: local ? PADDING : 0,
        color: labelColor,
        ...TYPOGRAPHY.overline2,
      },
      pin: {
        position: 'absolute',
        width: PIN_SIZE,
        height: PIN_SIZE,
        bottom: -6,
        left: PIN_OFFSET,
        borderRadius: SHAPES.radiusAll,
        borderColor: auxColor2,
        borderWidth: 2,
        backgroundColor: opened ? auxColor1 : COLORS.bubblegumRed300,
      },
    }), rippleColor }
  );
};

Shout.propTypes = {
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf([
    'lt-red-floating',
    'dt-gray-raised',
  ]),
  showPin: PropTypes.bool,
  local: PropTypes.bool,
  opened: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Shout;
