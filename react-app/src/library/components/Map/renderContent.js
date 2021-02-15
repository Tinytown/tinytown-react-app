import React, { useState, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as turf from '@turf/turf';
import Shout from './Shout';
import mapConfig from './config';
import mockShouts from './mockShouts';
import { COLORS, TYPOGRAPHY, SHAPES, STRINGS, IMAGES, normalizeStyles } from 'res';

const { SymbolLayer, UserLocation, MarkerView, ShapeSource, FillLayer } = MapboxGL;
const { SIGHT_RADIUS, ZOOM_STEP_1, ZOOM_STEP_2, RAFT_COORD, WELCOME_COORD } = mapConfig;

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

export const renderFog = (userLocation, zoom) => {
  if (!userLocation) {
    return;
  }

  const world = turf.polygon([[[-180, -90], [-180, 90], [180, 90], [180, -90], [-180, -90]]], { name: 'outside' });
  const userSight = turf.circle(userLocation, SIGHT_RADIUS, { units: 'kilometers' });
  const fog = turf.difference(world, userSight);

  return (
    <ShapeSource
      id="fogOfWar"
      shape={fog}
    >
      <FillLayer
        id="fogOfWarPolygon"
        style={{
          fillColor: COLORS.asphaltGray900,
          fillOpacity: zoom > ZOOM_STEP_1 ? 0.2 : 0,
          fillOpacityTransition: { duration: 500 },
        }}
      />
    </ShapeSource>
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
      marginTop: 4,
      marginBottom: 8,
      color: COLORS.asphaltGray300,
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

export const renderShouts = (remoteShouts, userLocation, zoom) => {
  const [renderedShouts, setRenderedShouts] = useState(null);
  const [allShouts, setAllShouts] = useState(null);
  const localShouts = useSelector((state) => state.shouts.local);
  const navigation = useNavigation();

  useEffect(() => {
    setAllShouts([...localShouts, ...remoteShouts]);
  }, [localShouts, remoteShouts]);

  useEffect(() => {
    if (!userLocation) {
      return;
    }

    // Adjust marker anchor for Android (this doesn't work reliably for iOS)
    const anchor = {
      x: 0.13,
      y: 0.9,
    };

    // area within within user's sight
    const userSight = turf.circle(userLocation, SIGHT_RADIUS, { units: 'kilometers' });

    if (zoom > ZOOM_STEP_1) {
      setRenderedShouts(allShouts?.map((shout) => {
        // check if shout is within user's sight
        const { coordinates } = shout;
        const shoutPoint = turf.point(coordinates);
        const inside = turf.booleanPointInPolygon(shoutPoint, userSight);

        if (!inside) {
          return;
        }

        return (
          <MarkerView
            key={shout.localId ? shout.localId : shout.id}
            id={shout.localId ? shout.localId.toString() : shout.id}
            coordinate={shout.coordinates}
            anchor={Platform.OS === 'android' ? anchor : null}
          >
            <Shout
              label={shout.text}
              local={!!shout.localId}
              onPress={() => navigation.navigate('Open Shout', { shout })}
            />
          </MarkerView>
        );
      }));
    } else if (zoom > ZOOM_STEP_2 && zoom <= ZOOM_STEP_1) {
      // Calculate avg center coordinates for bundle
      const avgCoords = allShouts.reduce((sum, { coordinates }) => (
        [sum[0] + coordinates[0], sum[1] + coordinates[1]]), [0, 0])
        .map((coord) => coord / allShouts.length);

      setRenderedShouts(
        <MarkerView
          id='bundle'
          coordinate={avgCoords}
          anchor={Platform.OS === 'android' ? anchor : null}
        >
          <Shout label={allShouts.length.toString()} showPin={false} />
        </MarkerView>
      );
    } else {
      setRenderedShouts(null);
    }
  }, [allShouts, zoom]);

  return renderedShouts;
};
