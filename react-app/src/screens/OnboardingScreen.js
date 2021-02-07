import React, { useState, useEffect, useRef } from 'react';
import { Animated, Image, View, Text } from 'react-native';
import { World, ActivityOverlay, OnboardingButtons } from 'library/components';
import { COLORS, TYPOGRAPHY, SHAPES, IMAGES, normalizeStyles } from 'res';

const OnboardingScreen = () => {
  const [authLoading, setAuthLoading] = useState(false);
  const [toasty, setToasty] = useState(true);
  const slideAnimation = useRef(new Animated.Value(240)).current;

  useEffect(() => {
    let timeoutId;
    if (toasty) {
      timeoutId = setTimeout(() => {
        Animated.sequence([
          Animated.spring(
            slideAnimation,
            {
              bounciness: 9,
              speed: 14,
              toValue: 0,
              useNativeDriver: true,
            }
          ),
          Animated.spring(
            slideAnimation,
            {
              delay: 750,
              toValue: 240,
              useNativeDriver: true,
            }
          ),
        ]).start();
      }, 7000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [toasty]);

  return (
    <World onTouchStart={() => setToasty(false)}>
      <ActivityOverlay showOverlay={authLoading} />
      <OnboardingButtons setAuthLoading={setAuthLoading} authLoading={authLoading} />
      <Animated.View
        style={{ ...styles.toastyContainer, transform: [{ translateX: slideAnimation }] }}
        onTouchEnd={() => console.log('touched')}
      >
        <Image source={IMAGES.toasty} style={styles.toastyImg} />
        <View style={styles.toastyBubble} >
          <Text style={styles.toastyText}>Toasty!</Text>
        </View>
      </Animated.View>
    </World>
  );
};

const styles = normalizeStyles({
  toastyContainer: {
    position: 'absolute',
    bottom: 88,
    right: -80,
  },
  toastyImg: {
    width: 240,
    height: 240,
    resizeMode: 'contain',

  },
  toastyBubble: {
    position: 'absolute',
    left: -48,
    top: 56,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.justWhite,
    borderTopLeftRadius: SHAPES.radiusLg,
    borderTopRightRadius: SHAPES.radiusLg,
    borderBottomRightRadius: SHAPES.radiusSm,
    borderBottomLeftRadius: SHAPES.radiusLg,
    ...SHAPES.elevGray2,
  },
  toastyText: {
    color: COLORS.asphaltGray800,
    ...TYPOGRAPHY.brandedButton,
  },
});

export default OnboardingScreen;
