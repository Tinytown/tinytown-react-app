import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Platform } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateOpenedShouts, updateOnboarding } from 'rdx/shoutState';
import * as turf from '@turf/turf';
import mapConfig from './config';
import { Config } from 'context';
import Shout from './Shout';
import { TYPOGRAPHY, SHAPES, IMAGES, normalizeStyles } from 'res';

const { SymbolLayer, MarkerView, ShapeSource, FillLayer, UserLocation } = MapboxGL;
const {
  SIGHT_RADIUS,
  ZOOM_STEP_1,
  ZOOM_STEP_2,
  RAFT_COORD,
  WELCOME_COORD,
  EXPIRATION_LENGTH,
  MIN_IN_MS,
} = mapConfig;

// adjust marker anchor for Android (this doesn't work reliably for iOS)
const anchor = {
  x: 0.18,
  y: 0.76,
};

export const renderUser = (location, heading) => {
  if (!location) {
    return;
  }

  user = turf.point(location);

  return (
    <UserLocation>
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
  const { COLORS, STRINGS } = useContext(Config.Context);
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
  const [shoutExpired, setShoutExpired] = useState(false);
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
  }, [location, timestamp, state, shoutExpired]);

  return renderedShout;
};

export const renderShouts = (remoteShouts, userLocation, zoom) => {
  const [renderedShouts, setRenderedShouts] = useState(null);
  const [insideShouts, setInsideShouts] = useState(null);
  const [outsideShouts, setOutsideShouts] = useState(null);
  const [shoutExpired, setShoutExpired] = useState(false);
  const localShouts = useSelector((state) => state.shouts.local);
  const openedShouts = useSelector((state) => state.shouts.opened);
  const uid = useSelector((state) => state.auth.user.uid);

  const navigation = useNavigation();
  const dispatch = useDispatch();

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
      const isNotExpired = shout.createdAt > Date.now() - EXPIRATION_LENGTH;

      // check if shout has been opened
      if (openedShouts.includes(shout.id)) {
        shout.opened = true;
      }

      if (isWithinBounds && isNotExpired) {
        return true;
      } else if (!isWithinBounds && isNotExpired) {
        filteredOutShouts.push(shout);
      } else if (!isNotExpired && openedShouts.includes(shout.id)) {
        dispatch(updateOpenedShouts('remove', shout.id));
      }
    });

    // find the oldest shout and set timer
    const timestamps = filteredInShouts.map(({ createdAt }) => createdAt);
    const timeToExpiration = Math.min(...timestamps) - Date.now() + EXPIRATION_LENGTH;

    if (timeToExpiration <= MIN_IN_MS) {
      setShoutExpired(false);
      setTimeout(() => {
        setShoutExpired(true);
      }, timeToExpiration);
    }

    setInsideShouts(filteredInShouts);
    setOutsideShouts(filteredOutShouts);
  }, [localShouts, remoteShouts, userLocation, shoutExpired, openedShouts]);

  useEffect(() => {
    if (zoom > ZOOM_STEP_1) {
      let renderedInShouts = [];
      let renderedOutShouts = [];

      if (insideShouts) {
        renderedInShouts = insideShouts.map((shout) => {
          const { id, localId, coordinates, text, local, opened } = shout;
          return (
            <MarkerView
              key={id ?? localId}
              id={id ?? localId.toString()}
              coordinate={coordinates}
              anchor={Platform.OS === 'android' ? anchor : null}
            >
              <Shout
                label={text}
                local={local}
                opened={shout.uid === uid || opened || local}
                onPress={() => navigation.navigate('OpenShout', { shout })}
              />
            </MarkerView>
          );
        });
      }

      if (outsideShouts) {
        renderedOutShouts = outsideShouts.map(({ id, localId, coordinates }) => {
          return (
            <MarkerView
              key={id && localId}
              id={id && localId.toString()}
              coordinate={coordinates}
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
      if (insideShouts) {
        // calculate avg center coordinates for bundle
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
      }
    } else {
      setRenderedShouts(null);
    }
  }, [insideShouts, outsideShouts, zoom]);

  return renderedShouts;
};

export const renderNotificationShouts = (remoteShouts, zoom) => {
  const [renderedShouts, setRenderedShouts] = useState(null);
  const [filteredShouts, setFilteredShouts] = useState(null);
  const notificationShouts = useSelector((state) => state.shouts.notifications);
  const openedShouts = useSelector((state) => state.shouts.opened);

  const navigation = useNavigation();

  useEffect(() => {
    const filtered = notificationShouts.filter((shout) => {
      // check if shout is already fetched
      if (remoteShouts.some((remoteShout) => remoteShout.id === shout.id)) {
        return false;
      }

      // check if shout has been opened
      if (openedShouts.includes(shout.id)) {
        shout.opened = true;
      }

      return true;
    });

    setFilteredShouts(filtered);
  }, [notificationShouts, openedShouts]);

  useEffect(() => {
    if (zoom > ZOOM_STEP_1) {
      let rendered = [];

      if (renderedShouts) {
        rendered = filteredShouts.map((shout) => {
          const { id, coordinates, text, opened } = shout;
          return (
            <MarkerView
              key={id}
              id={id}
              coordinate={coordinates}
              anchor={Platform.OS === 'android' ? anchor : null}
            >
              <Shout
                label={text}
                opened={opened}
                onPress={() => navigation.navigate('OpenShout', { shout })}
              />
            </MarkerView>
          );
        });
      }

      setRenderedShouts(rendered);
    }
  }, [filteredShouts, zoom]);

  return renderedShouts;
};

