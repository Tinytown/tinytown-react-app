import React, { useEffect, useState } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { Pressable } from 'library/components/hoc';
import { useAnimation } from 'library/hooks';
import { COLORS, TYPOGRAPHY, SHAPES, normalizeStyles, getThemeStyles } from 'res';

const Shout = React.memo(({
  label = 'Shout Label',
  theme = 'dark elevated',
  shake = false,
  showPin = true,
  local = false,
  disabled = false,
  onPress,
}) => {
  const [animation, animate] = useAnimation('shake');
  const [pressed, setPressed] = useState(false);
  const styles = generateStyles({ local, theme, disabled });

  // Shake animation
  useEffect(() => {
    let intervalId;
    if (shake && !pressed) {
      animate();
      intervalId = setInterval(() => {
        animate();
      }, 5000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [shake, pressed]);

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

const generateStyles = ({ local, theme, disabled }) => {
  const WIDTH = 200;
  const PADDING = 8;
  const PIN_OFFSET = 14;
  const PIN_SIZE = 10;
  const  { backgroundTheme, labelColor, rippleColor, auxColor }  = getThemeStyles(disabled ? 'disabled' : theme);

  return (
    { ...normalizeStyles({
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
        borderColor: backgroundTheme?.borderColor,
        borderWidth: 2,
        backgroundColor: auxColor,
      },
    }), rippleColor }
  );
};

Shout.propTypes = {
  label: PropTypes.string.isRequired,
  theme: PropTypes.oneOf([
    'red raised',
    'dark elevated',
  ]),
  showPin: PropTypes.bool,
  local: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Shout;
