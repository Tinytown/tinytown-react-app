import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Platform } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as turf from '@turf/turf';
import mapConfig from './config';
import { Config } from 'context';
import Shout from './Shout';
import { COLORS, TYPOGRAPHY, SHAPES, IMAGES, normalizeStyles } from 'res';

const { SymbolLayer, MarkerView, ShapeSource, FillLayer } = MapboxGL;
const {
  SIGHT_RADIUS,
  ZOOM_STEP_1,
  ZOOM_STEP_2,
  RAFT_COORD,
  WELCOME_COORD,
  EXPIRATION_TIME,
  DAY_IN_MS,
} = mapConfig;

export const renderUser = (userLocation, heading) => {
  if (!userLocation) {
    return;
  }

  user = turf.point(userLocation);

  return (
    <ShapeSource
      id='userLocation'
      shape={user}
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
    </ShapeSource>
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
      id='fogOfWar'
      shape={fog}
    >
      <FillLayer
        id="fogOfWarPolygon"
        style={{
          fillPattern: 'stripes',
          fillOpacity: zoom > ZOOM_STEP_1 ? 0.35 : 0,
          fillOpacityTransition: { duration: 500 },
        }}
      />
    </ShapeSource>
  );
};

export const renderWelcomeSign = () => {
  const { STRINGS } = useContext(Config.Context);
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
  const [insideShouts, setInsideShouts] = useState(null);
  const [outsideShouts, setOutsideShouts] = useState(null);
  const [shoutExpired, setShoutExpired] = useState(false);
  const localShouts = useSelector((state) => state.shouts.local);

  const navigation = useNavigation();

  useEffect(() => {
    if (!userLocation) {
      return;
    }

    // area within within user's sight
    const userSight = turf.circle(userLocation, SIGHT_RADIUS, { units: 'kilometers' });
    const filteredOutShouts = [];

    const filteredInShouts = [...localShouts, ...remoteShouts].filter((shout) => {
      // check if shout is within user's sight
      const shoutPoint = turf.point(shout.coordinates);
      const isWithinBounds = turf.booleanPointInPolygon(shoutPoint, userSight);

      // check if shout hasn't expired
      const isNotExpired = shout.createdAt > Date.now() - EXPIRATION_TIME;

      if (isWithinBounds && isNotExpired) {
        return true;
      } else if (!isWithinBounds) {
        filteredOutShouts.push(shout);
      }
    });

    // find the oldest shout and set timer
    const timestamps = filteredInShouts.map(({ createdAt }) => createdAt);
    const timeToExpiration = Math.min(...timestamps) - Date.now() + EXPIRATION_TIME;

    if (timeToExpiration <= DAY_IN_MS) {
      setShoutExpired(false);
      setTimeout(() => {
        setShoutExpired(true);
      }, timeToExpiration);
    }

    setInsideShouts(filteredInShouts);
    setOutsideShouts(filteredOutShouts);
  }, [localShouts, remoteShouts, userLocation, shoutExpired]);

  useEffect(() => {
    // Adjust marker anchor for Android (this doesn't work reliably for iOS)
    const anchor = {
      x: 0.13,
      y: 0.9,
    };

    if (zoom > ZOOM_STEP_1) {
      let renderedInShouts = [];
      let renderedOutShouts = [];

      if (insideShouts) {
        renderedInShouts = insideShouts.map((shout) => {
          return (
            <MarkerView
              key={shout.id && shout.localId}
              id={shout.id && shout.localId.toString()}
              coordinate={shout.coordinates}
              anchor={Platform.OS === 'android' ? anchor : null}
            >
              <Shout
                label={shout.text}
                local={shout.local}
                onPress={() => navigation.navigate('Open Shout', { shout })}
              />
            </MarkerView>
          );
        });
      }

      if (outsideShouts) {
        renderedOutShouts = outsideShouts.map((shout) => {
          return (
            <MarkerView
              key={shout.localId ? shout.localId : shout.id}
              id={shout.localId ? shout.localId.toString() : shout.id}
              coordinate={shout.coordinates}
              anchor={Platform.OS === 'android' ? anchor : null}
            >
              <Shout
                label='?'
                showPin={false}
                disabled
              />
            </MarkerView>
          );
        });
      }

      setRenderedShouts([...renderedInShouts, ...renderedOutShouts]);
    } else if (zoom > ZOOM_STEP_2 && zoom <= ZOOM_STEP_1) {
      // Calculate avg center coordinates for bundle
      const avgCoords = insideShouts.reduce((sum, { coordinates }) => (
        [sum[0] + coordinates[0], sum[1] + coordinates[1]]), [0, 0])
        .map((coord) => coord / insideShouts.length);

      setRenderedShouts(
        <MarkerView
          id='bundle'
          coordinate={avgCoords}
          anchor={Platform.OS === 'android' ? anchor : null}
        >
          <Shout label={insideShouts.length.toString()} showPin={false} />
        </MarkerView>
      );
    } else {
      setRenderedShouts(null);
    }
  }, [insideShouts, zoom]);

  return renderedShouts;
};
