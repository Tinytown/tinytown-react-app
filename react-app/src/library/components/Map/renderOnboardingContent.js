import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Platform } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateOnboarding } from 'rdx/shoutState';
import * as turf from '@turf/turf';
import mapConfig from './config';
import { Config } from 'context';
import Shout from './Shout';
import { TYPOGRAPHY, SHAPES, IMAGES, normalizeStyles } from 'res';

const { SymbolLayer, MarkerView, ShapeSource } = MapboxGL;
const {
  RAFT_COORD,
  WELCOME_COORD,
  EXPIRATION_LENGTH,
} = mapConfig;

// adjust marker anchor for Android (this doesn't work reliably for iOS)
const anchor = {
  x: 0.18,
  y: 0.76,
};

export const renderWelcomeSign = (onboarding) => {
  const { COLORS, STRINGS } = useContext(Config.Context);

  if (!onboarding) {
    return;
  }

  const styles = normalizeStyles({
    welcomeSign: {
      position: 'absolute',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: COLORS.basics.justWhite,
      borderTopLeftRadius: SHAPES.radiusLg,
      borderTopRightRadius: SHAPES.radiusLg,
      borderBottomRightRadius: SHAPES.radiusSm,
      borderBottomLeftRadius: SHAPES.radiusLg,
      ...SHAPES.elevGray2,
    },
    title: {
      color: COLORS.asphaltGray[800],
      ...TYPOGRAPHY.display3,
    },
    subtitle: {
      marginTop: 4,
      marginBottom: 8,
      color: COLORS.asphaltGray[300],
      ...TYPOGRAPHY.brandedButton,
    },
  });

  raftShape = turf.point(RAFT_COORD);

  return (
    <View>
      <MarkerView
        id='welcomeSign'
        coordinate={WELCOME_COORD}
      >
        <View style={styles.welcomeSign} >
          <Text style={styles.subtitle} >{STRINGS.onboarding.welcome}</Text>
          <Text style={styles.title}>Tinytown</Text>
        </View>
      </MarkerView>
      <ShapeSource
        id="onboardingRaft"
        shape={raftShape}
      >
        <SymbolLayer
          id='onboardingRaftImg'
          style={{
            iconImage: IMAGES.oobRaft,
            iconSize: 0.4,
          }}
        />
      </ShapeSource>
    </View>
  );
};

export const renderShoutOnboardingMarker = (userLocation) => {
  const [renderedShout, setRenderedShout] = useState(null);
  const { STRINGS: { onboarding: { shoutIntro: { title } } } } = useContext(Config.Context);
  const { state, location, timestamp } = useSelector((state) => state.shouts.onboarding);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressHandler = () => {
    navigation.navigate('ShoutOnboarding');
    if (state === 'active') {
      dispatch(updateOnboarding('state', 'visible'));
    }
  };

  useEffect(() => {
    if (!userLocation || state === 'expired' || !isSignedIn) {
      return;
    }

    // check if shout hasn't expired
    const isNotExpired = (timestamp > Date.now() - EXPIRATION_LENGTH) || timestamp === null;

    if (!location) {
      dispatch(updateOnboarding('location', [userLocation[0] - 0.005, userLocation[1] + 0.005]));
    } else if (isNotExpired) {
      setRenderedShout(
        <MarkerView
          id='notificationMarker'
          coordinate={location}
          anchor={Platform.OS === 'android' ? anchor : null}
        >
          <Shout
            label={title}
            theme='lt-red-floating'
            shake={state === 'active'}
            onPress={onPressHandler}
          />
        </MarkerView>
      );
    } else {
      dispatch(updateOnboarding('state', 'expired'));
    }
  }, [location, timestamp, state]);

  return renderedShout;
};

