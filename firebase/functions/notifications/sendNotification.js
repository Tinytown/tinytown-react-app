/* eslint-disable camelcase */
const admin = require('firebase-admin');
const turf = require('@turf/turf');
const getSurroundingCodes = require('../location/getSurroundingCodes');
const { SIGHT_RADIUS } = require('../location/config');

module.exports = async ({ text, coordinates, id, createdAt }, senderId) => {
  const config = await admin.remoteConfig().getTemplate()
    .catch((e) => console.log(e));;
  const {
    COLORS: { defaultValue: { value: colorValues } },
    STRINGS: { defaultValue: { value: stringValues } },
  } = config.parameters;
  const COLORS = JSON.parse(colorValues);
  const STRINGS = JSON.parse(stringValues);

  const message = {
    notification: {
      body: text,
      title: STRINGS.notifications.newShout,
    },
    data: {
      shout: JSON.stringify({ coordinates, id, createdAt }),
    },
    apns: {
      payload: {
        aps: {
          'mutable-content': 1,
        },
      },
    },
    android: {
      priority: 'high',
      notification: {
        icon: 'ic_stat_megaphone',
        color: COLORS.bubblegumRed[400],
        channel_id: 'shouts',
        notification_count: 1,
        light_settings: {
          color: {
            red: 1,
            green: 0.27,
            blue: 0.38,
          },
          light_on_duration: '0.25s',
          light_off_duration: '2s',
        },
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

    if (!areasSnapshot || areasSnapshot.empty) {
      return;
    }

    areasSnapshot.docs.forEach(async ({ id }) => {
      const devicesSnapshot = await mapRef.doc(id).collection('devices')
        .get();

      if (!devicesSnapshot || devicesSnapshot.empty) {
        return;
      }

      devicesSnapshot.docs.forEach(async (doc) => {
        const { lastLocation, deviceId, uid } = doc.data();
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
        const { registrationToken, settings: { notifications } } = device.data();

        // check if notifications are enabled
        if (notifications) {
          await admin.messaging().send({ ...message, token: registrationToken })
            .catch((e) => console.log(e));;
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
