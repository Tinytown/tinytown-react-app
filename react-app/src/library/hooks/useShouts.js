import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { removeShout } from 'rdx/shoutState';
import { encode } from 'library/apis/openlocationcode';

export default (userLocation) => {
  const CODE_PRECISION = 6;
  const RADIUS = 2.5;
  const LAT_DISTANCE = 111.11;
  const LON_DISTANCE = 111;
  const [shouts, setShouts] = useState(null);
  const dispatch = useDispatch();

  const translateCoords = (coords, amountLon, amountLat) => {
    // calculate new coords
    const translatedLat = amountLat / LAT_DISTANCE;
    const translatedLon = (amountLon / LON_DISTANCE) * Math.cos(coords[1]);
    const translated = [(coords[0] - translatedLon), (coords[1] - translatedLat)];

    return translated;
  };

  const getSurroundingCodes = () => {
    const surroundingCoords = [];
    // generate four sets of coords from user location
    surroundingCoords.push(translateCoords(userLocation, -RADIUS, -RADIUS));
    surroundingCoords.push(translateCoords(userLocation, RADIUS, -RADIUS));
    surroundingCoords.push(translateCoords(userLocation, RADIUS, RADIUS));
    surroundingCoords.push(translateCoords(userLocation, -RADIUS, RADIUS));

    // encode plus codes for each set of coords
    const codes = surroundingCoords.map((coord) => {
      return encode(coord[1], coord[0], CODE_PRECISION);
    });

    return codes;
  };

  const fetchShouts = () => {
    if (!userLocation) {
      return;
    }

    const plusCodes =
    [...new Set([encode(userLocation[1], userLocation[0], CODE_PRECISION), ...getSurroundingCodes()])];
    const areasRef = firestore()
      .collection('map')
      .where('__name__', 'in', plusCodes);
    const shoutsArr = [];

    return areasRef.onSnapshot((areasSnapshot) => {
      if (areasSnapshot.size === 0) {
        setShouts(shoutsArr);
        return;
      }

      areasSnapshot.forEach((doc) => {
        doc.ref.collection('shouts').onSnapshot((shoutsSnapshot) => {
          shoutsSnapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              // console.log('Added shout: ', change.doc.data());

              // check if shout was just created and remove from redux
              dispatch(removeShout(change.doc.id));

              shoutsArr.push(change.doc.data());
              setShouts(shoutsArr);
            }
            if (change.type === 'modified') {
              console.log('Modified shout: ', change.doc.data());
            }
            if (change.type === 'removed') {
              console.log('Removed shout: ', change.doc.data());
            }
          });
        });
      });
    });
  };

  useEffect(() => {
    return fetchShouts();
  }, [userLocation]);

  return [shouts];
};
