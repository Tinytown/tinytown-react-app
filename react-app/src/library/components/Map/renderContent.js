import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateOpenedShouts, updateLocalShouts } from 'rdx/shoutState';
import * as turf from '@turf/turf';
import mapConfig from './config';
import Shout from './Shout';
import { IMAGES } from 'res';

const { SymbolLayer, MarkerView, ShapeSource, FillLayer, UserLocation } = MapboxGL;
const {
  SIGHT_RADIUS,
  ZOOM_STEP_1,
  ZOOM_STEP_2,
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
      } else if (!isNotExpired && (shout.local || shout.system)) {
        dispatch(updateLocalShouts('remove', shout));
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
          console.log(id, localId);
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

export const renderNotificationShouts = (remoteShouts, zoom, onboarding) => {
  const [renderedShouts, setRenderedShouts] = useState(null);
  const [filteredShouts, setFilteredShouts] = useState(null);
  const notificationShouts = useSelector((state) => state.shouts.notifications);
  const openedShouts = useSelector((state) => state.shouts.opened);

  const navigation = useNavigation();

  useEffect(() => {
    if (onboarding) {
      return;
    }

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
  }, [notificationShouts, openedShouts, onboarding]);

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

