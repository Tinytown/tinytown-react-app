import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { onboardingRaftShape } from './GeoJSON';
import Shout from './Shout';
import mockShouts from './mockShouts';
import { COLORS, TYPOGRAPHY, SHAPES, STRINGS, IMAGES, normalizeStyles, normalizeValue } from 'res';
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

export const renderShouts = (shouts) => {
  let renderedShouts = null;

  if (shouts) {
    renderedShouts = mockShouts.map((shout) => {
      const WRAPPER_PADDING = 8;
      const PIN_OFFSET = 14;
      const normalizedPadding = normalizeValue(WRAPPER_PADDING);
      const normalizedOffset = normalizeValue(PIN_OFFSET);
      const [shoutLayout, setShoutLayout] = useState(null);

      // Tweak anchor on each platform
      let adjustX = 0;
      let adjustY = 0;

      if (Platform.OS === 'ios' && shoutLayout) {
        adjustX = -((shoutLayout.width / 48) * 0.09);
        adjustY = 0.3;
      } else if (Platform.OS === 'android' && shoutLayout) {
        adjustX = 0.03;
      }

      // Dynamically adjust marker anchor based on width / height
      const anchor = {
        x: shoutLayout ? (normalizedPadding + normalizedOffset) / shoutLayout.width + adjustX : 0,
        y: shoutLayout ? ((shoutLayout.height - normalizedPadding) / shoutLayout.height) + adjustY : 0,
      };

      return (
        <MarkerView
          key={shout.id}
          id={shout.id}
          coordinate={shout.coordinates}
          anchor={anchor}
        >
          <Shout label={shout.text} onLayout={setShoutLayout} styleOffset={{ WRAPPER_PADDING, PIN_OFFSET }} />
        </MarkerView>

      );
    });
  }

  return renderedShouts;
};
