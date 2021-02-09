import React, { useState, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { onboardingRaftShape } from './GeoJSON';
import Shout from './Shout';
import mockShouts from './mockShouts';
import { COLORS, TYPOGRAPHY, SHAPES, STRINGS, IMAGES, normalizeStyles } from 'res';
const { SymbolLayer, UserLocation, MarkerView, ShapeSource } = MapboxGL;

export const renderUser = (heading) => {
  return (
    <UserLocation
      animated={true}
      visible={true}
    >
      <SymbolLayer
        id={'userMarkerImg'}
        style={{
          iconAllowOverlap: true,
          iconIgnorePlacement: true,
          iconImage: IMAGES.userMarker,
          iconSize: 0.4,
          iconRotate: heading || 0,
          iconRotationAlignment: 'map',
        }}
        minZoomLevel={1}
      />
    </UserLocation>
  );
};

export const renderWelcomeSign = () => {
  const styles = normalizeStyles({
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
      ...SHAPES.elevGray2,
    },
    title: {
      color: COLORS.asphaltGray800,
      ...TYPOGRAPHY.display3,
    },
    subtitle: {
      marginBottom: 4,
      color: COLORS.asphaltGray300,
      ...TYPOGRAPHY.brandedButton,
    },
  });

  return (
    <View>
      <MarkerView
        id='welcomeSign'
        coordinate={[-70.1015, 41.3248]}
      >
        <View style={styles.welcomeSign} >
          <Text style={styles.subtitle} >{STRINGS.onboarding.welcome}</Text>
          <Text style={styles.title}>Tinytown</Text>
        </View>
      </MarkerView>
      <ShapeSource
        id="onboardingRaft"
        shape={onboardingRaftShape}
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

export const renderShouts = (shouts, zoom) => {
  const [renderedShouts, setRenderedShouts] = useState(null);

  useEffect(() => {
    // Adjust marker anchor for Android (this doesn't work reliably for iOS)
    const anchor = {
      x: 0.11,
      y: 0.9,
    };

    if (zoom > 11) {
      setRenderedShouts(mockShouts?.map((shout) => {
        return (
          <MarkerView
            key={shout.id}
            id={shout.id}
            coordinate={shout.coordinates}
            anchor={Platform.OS === 'android' ? anchor : null}
          >
            <Shout label={shout.text} />
          </MarkerView>

        );
      }));
    } else if (zoom > 9 && zoom <= 11) {
      // Calculate avg center coordinates
      const avgCoords = mockShouts.reduce((sum, { coordinates }) => (
        [sum[0] + coordinates[0], sum[1] + coordinates[1]]), [0, 0])
        .map((coord) => coord / mockShouts.length);

      setRenderedShouts(
        <MarkerView
          id='bundle'
          coordinate={avgCoords}
          anchor={Platform.OS === 'android' ? anchor : null}
        >
          <Shout label={mockShouts.length.toString()} showPin={false} />
        </MarkerView>
      );
    } else {
      setRenderedShouts(null);
    }
  }, [shouts, zoom]);

  return renderedShouts;
};
