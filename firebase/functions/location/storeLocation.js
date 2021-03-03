const admin = require('firebase-admin');
const { encode, decode } = require('pluscodes');
const { PLUSCODE_PRECISION } = require('../config/mapConfig');

module.exports = async (data, context) => {
  const { deviceId, coordinates } = data;
  const { auth: { uid } } = context;
  const db = admin.firestore();

  const plusCode = encode({ longitude: coordinates[0], latitude: coordinates[1] }, PLUSCODE_PRECISION);
  const area = decode(plusCode);

  const mapRef =  db.collection('map').doc(plusCode);
  const deviceRef =  db.collection('users').doc(uid)
    .collection('devices')
    .doc(deviceId);

  try {
    // store in users collection
    await deviceRef.update({ lastLocation: coordinates });

    // store in map collection
    await mapRef.set({ area }, { merge: true });
    await mapRef.collection('devices').doc(deviceId)
      .set({ deviceId, lastLocation: coordinates, uid });

    return;
  } catch (error) {
    console.log(error);
    return;
  }
};
