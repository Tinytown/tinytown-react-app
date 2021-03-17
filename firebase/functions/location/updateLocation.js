const admin = require('firebase-admin');
const { encode, decode } = require('pluscodes');
const { PLUSCODE_PRECISION } = require('./config');

module.exports = async (uid, deviceId, coordinates) => {
  const db = admin.firestore();

  const plusCode = encode({ longitude: coordinates[0], latitude: coordinates[1] }, PLUSCODE_PRECISION);
  const areaCoords = decode(plusCode);

  const mapRef =  db.collection('map').doc(plusCode);
  const deviceRef =  db.collection('users').doc(uid)
    .collection('devices')
    .doc(deviceId);

  try {
    // remove from previous area
    const device = await deviceRef.get();
    const data = device.data();
    if (data && data.lastArea) {
      await db.collection('map').doc(data.lastArea)
        .collection('devices')
        .doc(deviceId)
        .delete();
    }

    // store in users collection
    await deviceRef.update({ lastLocation: coordinates, lastArea: plusCode });

    // store in map collection
    await mapRef.set({ area: areaCoords }, { merge: true });
    await mapRef.collection('devices').doc(deviceId)
      .set({ deviceId, lastLocation: coordinates, uid });
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};
