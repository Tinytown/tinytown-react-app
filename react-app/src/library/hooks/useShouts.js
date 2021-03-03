import { useState, useEffect, useRef } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import _ from 'lodash';
import * as turf from '@turf/turf';
import { useDispatch, useSelector } from 'react-redux';
import { removeShout, updateShoutsLoading } from 'rdx/shoutState';
import { encode } from 'library/apis/openlocationcode';
import { mapConfig } from 'library/components/Map';

export default (userLocation) => {
  const { SIGHT_RADIUS, PLUSCODE_PRECISION } = mapConfig;

  const [shouts, setShouts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [prevLocation, setPrevLocation] = useState([]);
  const subscribers = [];
  const uid = useSelector((state) => state.auth.user.uid);
  const localShouts = useSelector((state) => state.shouts.local);

  const dispatch = useDispatch();

  // get nearby plus codes
  const getSurroundingCodes = () => {
    const userPoint = turf.point(userLocation);

    // generate four sets of coords from user location
    const NE = turf.transformTranslate(userPoint, SIGHT_RADIUS, 45, { units: 'kilometers' });
    const SE = turf.transformTranslate(userPoint, SIGHT_RADIUS, 135, { units: 'kilometers' });
    const SW = turf.transformTranslate(userPoint, SIGHT_RADIUS, 225, { units: 'kilometers' });
    const NW = turf.transformTranslate(userPoint, SIGHT_RADIUS, 315, { units: 'kilometers' });

    const surroundingCoords = [
      NE.geometry.coordinates,
      SE.geometry.coordinates,
      SW.geometry.coordinates,
      NW.geometry.coordinates,
    ];

    // encode plus codes for each set of coords
    const codes = surroundingCoords.map((coord) => {
      return encode(coord[1], coord[0], PLUSCODE_PRECISION);
    });

    return codes;
  };

  // update loading state
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
      const filteredShouts = shouts.filter((shout) => oldCodes.every((code) => code !== shout.plusCode));
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
          if (!shoutsSnapshot || shoutsSnapshot?.size === 0) {
            return;
          }

          shoutsSnapshot.docChanges().forEach(({ type, doc }) => {
            if (type === 'added') {
              const remoteShout = doc.data();

              setShouts((currentValue) => {
                // check if shout was already added
                const duplicate = currentValue.some((shout) => shout.id === remoteShout.id);
                if (duplicate) {
                  return currentValue;
                }

                debouncedLoading.current();
                return [...currentValue, remoteShout];
              });

              // check if shout was just created and remove from redux
              if (remoteShout.uid === uid && localShouts.some((shout) => shout.id === remoteShout.id)) {
                dispatch(removeShout(remoteShout.id));
              }
            }
            if (type === 'modified') {
              console.log('Modified shout: ', doc.data());
            }
            if (type === 'removed') {
              console.log('Removed shout: ', doc.data());
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
