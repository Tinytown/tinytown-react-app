const admin = require('firebase-admin');
const { encode, decode } = require('pluscodes');
const sendToTwitter = require('./sendToTwitter');

module.exports = async (data, context) => {
  CODE_PRECISION = 6;
  const { text, sourcePlatform, coordinates, localId, sendTo } = data;
  const { auth: { uid } } = context;
  const db = admin.firestore();

  const plusCode = encode({ longitude: coordinates[0], latitude: coordinates[1] }, CODE_PRECISION);
  const area = decode(plusCode);

  const shoutRef =  db.collection('shouts').doc();
  const mapRef =  db.collection('map').doc(plusCode);
  const userRef =  db.collection('users').doc(uid);

  const shout = {
    createdAt: Date.now(),
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
    await shoutRef.set(shout);
    await mapRef.collection('shouts').doc(shoutRef.id)
      .set(shout);
    mapRef.set({ area });
    userRef.collection('shouts').add(shout);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};
