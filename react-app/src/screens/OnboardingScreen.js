import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { World, ActivityOverlay, OnboardingButtons } from 'library/components';
import { COLORS, TYPOGRAPHY, SHAPES, STRINGS, IMAGES, normalizeStyles } from 'res';

const OnboardingScreen = () => {
  const [authLoading, setAuthLoading] = useState(false);
  const [showSign, setShowSign] = useState(false);

  return (
    <World onTouchStart={() => setShowSign(false)} onMapRendered={() => setShowSign(true)} >
      <ActivityOverlay showOverlay={authLoading} />
      <OnboardingButtons setAuthLoading={setAuthLoading} authLoading={authLoading} />
      {showSign &&
      <View style={styles.signContainer} pointerEvents='box-none'>
        <Image style={styles.image} source={IMAGES.oobRaft} />
        <View style={styles.welcomeSign} >
          <Text style={styles.subtitle} >{STRINGS.onboarding.welcome}</Text>
          <Text style={styles.title} >Tinytown</Text>
        </View>
      </View>
      }
    </World>
  );
};

const styles = normalizeStyles({
  signContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    transform: [{ translateX: 108 }, { translateY: -110 }],
  },
  welcomeSign: {
    position: 'absolute',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.justWhite,
    borderTopLeftRadius: SHAPES.radiusLg,
    borderTopRightRadius: SHAPES.radiusLg,
    borderBottomRightRadius: SHAPES.radiusSm,
    borderBottomLeftRadius: SHAPES.radiusLg,
    transform: [{ translateX: -32 }, { translateY: -220 }],
    ...SHAPES.elevGray2,
  },
  title: {
    color: COLORS.asphaltGray800,
    ...TYPOGRAPHY.display3,
  },
  subtitle: {
    marginBottom: 8,
    color: COLORS.asphaltGray300,
    ...TYPOGRAPHY.brandedButton,
  },
});

export default OnboardingScreen;
