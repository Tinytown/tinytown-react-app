import { useState, useEffect, useRef } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { removeShout, updateShoutsLoading } from 'rdx/shoutState';
import { encode } from 'library/apis/openlocationcode';
import { mapConfig } from 'library/components/Map';

export default (userLocation) => {
  const { SIGHT_RADIUS, PLUSCODE_PRECISION } = mapConfig;

  const LAT_DISTANCE = 111.11;
  const LON_DISTANCE = 111;
  const [shouts, setShouts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [prevLocation, setPrevLocation] = useState([]);
  const subscribers = [];
  const dispatch = useDispatch();
  const uid = auth().currentUser?.uid;

  // Translate coords by given amount (km)
  const translateCoords = (coords, amountLon, amountLat) => {
    // calculate new coords
    const translatedLat = amountLat / LAT_DISTANCE;
    const translatedLon = (amountLon / LON_DISTANCE) * Math.cos(coords[1]);
    const translated = [(coords[0] - translatedLon), (coords[1] - translatedLat)];

    return translated;
  };

  // Get nearby plus codes
  const getSurroundingCodes = () => {
    const surroundingCoords = [];
    // generate four sets of coords from user location
    surroundingCoords.push(translateCoords(userLocation, -SIGHT_RADIUS, -SIGHT_RADIUS));
    surroundingCoords.push(translateCoords(userLocation, SIGHT_RADIUS, -SIGHT_RADIUS));
    surroundingCoords.push(translateCoords(userLocation, SIGHT_RADIUS, SIGHT_RADIUS));
    surroundingCoords.push(translateCoords(userLocation, -SIGHT_RADIUS, SIGHT_RADIUS));

    // encode plus codes for each set of coords
    const codes = surroundingCoords.map((coord) => {
      return encode(coord[1], coord[0], PLUSCODE_PRECISION);
    });

    return codes;
  };

  // Update loading state
  const debouncedLoading = useRef(_.debounce(() => {
    dispatch(updateShoutsLoading(false));
  }, 500, { leading: false, trailing: true }));

  const fetchShouts = () => {
    if (!userLocation) {
      return;
    }

    // generate plus codes based on user's location and surrounding areas
    const plusCodes =
    [...new Set([encode(userLocation[1], userLocation[0], PLUSCODE_PRECISION), ...getSurroundingCodes()])];

    // select unused codes from previous state
    const oldCodes = areas.filter((area) => !plusCodes.includes(area));
    setAreas(plusCodes);

    // remove shouts from unused codes
    if (shouts.length) {
      const filteredShouts = shouts.filter((shout) => oldCodes.every((code) => code !== shout.plus_code));
      setShouts(filteredShouts);
    }

    // set up ref using plus codes
    const areasRef = firestore()
      .collection('map')
      .where('__name__', 'in', plusCodes);

    // start listening for changes in all areas
    const areaSubscriber = areasRef.onSnapshot((areasSnapshot) => {
      if (!areasSnapshot || areasSnapshot?.size === 0) {
        return;
      }

      // start listening for changes in each area
      areasSnapshot.forEach((doc) => {
        const shoutSubscriber = doc.ref.collection('shouts').onSnapshot((shoutsSnapshot) => {
          if (!shoutsSnapshot) {
            return;
          }

          shoutsSnapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              setShouts((currentValue) => {
                // check if shout was already added
                const duplicate = currentValue.some((shout) => shout.id === change.doc.id);
                if (duplicate) {
                  return currentValue;
                }
                debouncedLoading.current();
                return [...currentValue, change.doc.data()];
              });

              // check if shout was just created and remove from redux
              const remoteShout = change.doc.data();
              if (remoteShout.uid === uid) {
                dispatch(removeShout(change.doc.data()));
              }
            }
            if (change.type === 'modified') {
              console.log('Modified shout: ', change.doc.data());
            }
            if (change.type === 'removed') {
              console.log('Removed shout: ', change.doc.data());
            }
          });
        });
        subscribers.push(shoutSubscriber);
      });
    });
    subscribers.push(areaSubscriber);
    return subscribers;
  };

  useEffect(() => {
    let isMounted = true;
    let subscribers = [];

    if (isMounted && userLocation) {
      // return early if location is the same
      const sameLocation = userLocation.every((val, index) => val == prevLocation[index]);
      if (sameLocation) {
        return;
      }

      setPrevLocation(userLocation);
      subscribers = fetchShouts();
    }

    return () => {
      isMounted = false;
      subscribers.forEach((unsubscribe) => {
        unsubscribe();
      });
    };
  }, [userLocation]);

  return [shouts];
};
