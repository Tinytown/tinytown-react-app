const admin = require('firebase-admin');
const turf = require('@turf/turf');
const getSurroundingCodes = require('../location/getSurroundingCodes');
const { SIGHT_RADIUS } = require('../location/config');

module.exports = async (coordinates, text, senderId) => {
  const message = {
    notification: {
      body: text,
      title: 'New shout nearby',
    },
    apns: {
      payload: {
        aps: {
          'mutable-content': 1,
        },
      },
      fcm_options: {
        // image: 'image-url',
      },
    },
    android: {
      notification: {
        // image: 'image-url',
      },
    },
  };

  const db = admin.firestore();
  const plusCodes = getSurroundingCodes(coordinates);
  const shoutRadius = turf.circle(coordinates, SIGHT_RADIUS, { units: 'kilometers' });

  const mapRef = db.collection('map');
  const areasRef = db.collection('map').where('__name__', 'in', plusCodes);
  const usersRef = db.collection('users');

  try {
    const areasSnapshot = await areasRef.get();
    areasSnapshot.docs.forEach(async ({ id }) => {
      const devices = await mapRef.doc(id).collection('devices')
        .get();
      devices.docs.forEach(async ({ data }) => {
        const { lastLocation, deviceId, uid } = data();
        const devicePoint = turf.point(lastLocation);
        const isWithinBounds = turf.booleanPointInPolygon(devicePoint, shoutRadius);

        // check if sender's device or out of range
        if (uid === senderId || !isWithinBounds) {
          return;
        }

        // get registration token
        const device = await usersRef.doc(uid).collection('devices')
          .doc(deviceId)
          .get();
        const { registrationToken } = device.data();

        // check if notifications are enabled
        if (registrationToken) {
          message.token = registrationToken;
          admin.messaging().send(message);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
