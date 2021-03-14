const admin = require('firebase-admin');
const { encode, decode } = require('pluscodes');
const sendToTwitter = require('./sendToTwitter');
const sendNotification = require('../notifications/sendNotification');
const { PLUSCODE_PRECISION } = require('../location/config');

module.exports = async (data, context) => {
  const { createdAt, text, sourcePlatform, coordinates, localId, sendTo } = data;
  const { auth: { uid } } = context;
  const db = admin.firestore();

  const plusCode = encode({ longitude: coordinates[0], latitude: coordinates[1] }, PLUSCODE_PRECISION);
  const area = decode(plusCode);

  const shoutRef =  db.collection('shouts').doc();
  const mapRef =  db.collection('map').doc(plusCode);
  const userRef =  db.collection('users').doc(uid);

  const shout = {
    createdAt,
    text,
    sourcePlatform,
    sendTo,
    coordinates,
    plusCode,
    localId,
    id: shoutRef.id,
    uid,
  };

  if (sendTo.twitter) {
    sendToTwitter(shout);
  }

  try {
    // store in shouts collection
    await shoutRef.set(shout);

    // store in map collection
    await mapRef.set({ area }, { merge: true });
    await mapRef.collection('shouts').doc(shoutRef.id)
      .set(shout);

    // store in users collection
    await userRef.collection('shouts').doc(shoutRef.id)
      .set(shout);

    sendNotification(shout, uid);

    return;
  } catch (error) {
    console.log(error);
    return;
  }
};
