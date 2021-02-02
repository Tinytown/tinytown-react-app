import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { encode } from 'library/apis/openlocationcode';

export default (userLocation) => {
  CODE_PRECISION = 6;
  const [shouts, setShouts] = useState(null);

  const fetch = () => {
    if (userLocation) {
      const plusCode = encode(userLocation[1], userLocation[0], CODE_PRECISION);
      const shoutsRef = firestore()
        .collection('map')
        .doc(plusCode)
        .collection('shouts');

      return shoutsRef.onSnapshot((querySnapshot) => {
        const shoutsArr = [];
        querySnapshot.forEach((doc) => {
          shoutsArr.push(doc.data());
          setShouts(shoutsArr);
        });
      });
    }
  };

  useEffect(() => {
    return fetch();
  }, [userLocation]);

  return [shouts];
};
