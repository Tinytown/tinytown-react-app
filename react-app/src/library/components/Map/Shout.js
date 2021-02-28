import React, { useState, useEffect } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { Pressable } from 'library/components/hoc';
import { useAnimation } from 'library/hooks';
import { COLORS, TYPOGRAPHY, SHAPES, normalizeStyles, getThemeStyles } from 'res';

const Shout = React.memo(({
  label = 'Shout Label',
  theme = 'dark elevated',
  loud = false,
  showPin = true,
  local = false,
  disabled = false,
  onPress,
}) => {
  const [animation, animateOnPress] = useAnimation('jiggle', 4);
  const [layout, setLayout] = useState(null);
  const styles = generateStyles({ local, theme, loud, disabled, layout });

  // Animate card behind shout
  useEffect(() => {
    let intervalId;
    if (loud) {
      intervalId = setInterval(() => {
        animateOnPress('in');
        setTimeout(() => {
          animateOnPress('out');
        }, 500);
      }, 5000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const onLayoutHandler = (event) => {
    event.persist();
    setLayout(event.nativeEvent.layout);
  };

  return (
    <View style={styles.wrapper} pointerEvents='box-none' >
      <Pressable
        containerStyle={styles.container}
        onPress={onPress}
        rippleColor={styles.keyColor}
        disabled={disabled}
      >
        {loud && layout && <Animated.View style={[styles.card, animation]}/>}
        <View style={styles.button} onLayout={onLayoutHandler} >
          {local && <ActivityIndicator size='small' color={COLORS.grassGreen400} />}
          <Text style={styles.label} numberOfLines={1} >{label}</Text>
          {showPin && <View style={styles.pin}/>}
        </View>
      </Pressable>
    </View>
  );
});

const generateStyles = ({ local, theme, loud, disabled, layout }) => {
  const WIDTH = 200;
  const PADDING = 8;
  const PIN_OFFSET = 14;
  const PIN_SIZE = 10;
  const  [backgroundTheme, keyColor, contentColor]  = getThemeStyles(disabled ? 'disabled' : theme);

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
        width: layout && layout.width,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SHAPES.radiusAll,
      },
      button: {
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
        color: contentColor,
        ...TYPOGRAPHY.overline2,
      },
      pin: {
        position: 'absolute',
        width: PIN_SIZE,
        height: PIN_SIZE,
        bottom: -6,
        left: PIN_OFFSET,
        borderRadius: SHAPES.radiusAll,
        borderColor: backgroundTheme.backgroundColor && backgroundTheme.borderColor,
        borderWidth: 2,
        backgroundColor: loud ? backgroundTheme.backgroundColor : contentColor,
      },
      card: {
        position: 'absolute',
        height: '100%',
        width: '60%',
        borderRadius: SHAPES.radiusMd,
        backgroundColor: COLORS.asphaltGray800,
        ...(disabled && { opacity: 0 }),
      },
    }), keyColor, contentColor }
  );
};

Shout.propTypes = {
  label: PropTypes.string.isRequired,
  theme: PropTypes.string,
  loud: PropTypes.bool,
  showPin: PropTypes.bool,
  local: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Shout;
