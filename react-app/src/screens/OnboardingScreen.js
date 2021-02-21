import React, { useState, useEffect, useRef } from 'react';
import { Animated, Image } from 'react-native';
import { connect } from 'react-redux';
import { World, ActivityOverlay, OnboardingButtons, SpeechBubble } from 'library/components';
import { IMAGES, normalizeStyles } from 'res';

const OnboardingScreen = ({ navigation, userLocation }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [toasty, setToasty] = useState(true);
  const slideAnimation = useRef(new Animated.Value(240)).current;

  useEffect(() => {
    let timeoutId;
    if (toasty && !userLocation) {
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
      }, 15000);
    } else {
      clearTimeout(timeoutId);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [toasty, userLocation]);

  return (
    <World onTouchStart={() => setToasty(false)}>
      <ActivityOverlay showOverlay={authLoading} />
      <OnboardingButtons
        setAuthLoading={setAuthLoading}
        authLoading={authLoading}
        onTouchStart={() => setToasty(false)}
      />
      <Animated.View
        style={{ ...styles.toastyContainer, transform: [{ translateX: slideAnimation }] }}
        onTouchEnd={() => navigation.navigate('Wololo')}
      >
        <Image source={IMAGES.toasty} style={styles.toastyImg}/>
        <SpeechBubble wrapperStyle={styles.toastyBubble} content='TOASTY!' flip />
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
  },
});

const mapStateToProps = (state) => ({
  userLocation: state.location.user,
});

export default connect(mapStateToProps, {})(OnboardingScreen);
