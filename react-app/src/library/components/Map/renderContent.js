import React from 'react';
import { View, Text } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { onboardingRaftShape } from './GeoJSON';
import Shout from './Shout';
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
  // console.log('shouts', shouts);
  const mockShouts = [{ 'coordinates': [175.0494383, -41.1333], 'created_at': 1612803116600, 'id': 'cZHN1yZVRZWaTj0zOBA4', 'plus_code': '4VCQV200+', 'source_platform': 'android', 'text': 'This is a really, really long shout' }, { 'coordinates': [175.066293, -41.126075], 'created_at': 1612804338873, 'id': 'sGHCFnVmSE7BlBSL3Mia', 'plus_code': '4VCQV300+', 'source_platform': 'ios', 'text': 'Shorty' }, { 'coordinates': [-122.334009, 47.6912765], 'created_at': 1612803116600, 'id': 'cZHN1yZVRZWaTj0zOBA3', 'plus_code': '4VCQV200+', 'source_platform': 'android', 'text': 'This is a really, really long shout' }];

  if (shouts) {
    renderedShouts = mockShouts.map((shout) => {
      return (
        <MarkerView
          key={shout.id}
          id={shout.id}
          coordinate={shout.coordinates}
        >
          <Shout label={shout.text}/>
        </MarkerView>
      );
    });
  }

  return renderedShouts;
};
