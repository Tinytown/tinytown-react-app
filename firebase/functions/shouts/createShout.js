/* eslint-disable camelcase*/
const admin = require('firebase-admin');
const { encode, decode } = require('pluscodes');

module.exports = async (data, context) => {
  CODE_PRECISION = 6;
  const { text, sourcePlatform, coordinates  } = data;
  const { auth: { uid, token: { name } } } = context;
  const db = admin.firestore();

  const shout = {
    created_at: Date.now(),
    text,
    source_platform: sourcePlatform,
    coordinates,
  };

  const user = {
    uid,
    name,
  };

  const plusCode = encode({ longitude: coordinates[0], latitude: coordinates[1] }, CODE_PRECISION);
  const area = decode(plusCode);

  const shoutRef =  db.collection('shouts').doc();
  const mapRef =  db.collection('map').doc(plusCode);
  const userRef =  db.collection('users').doc(uid);
  shout.id = shoutRef.id;
  shout.plus_code = plusCode;

  try {
    await shoutRef.set({ ...shout, user });
    await mapRef.collection('shouts').doc(shoutRef.id)
      .set({ ...shout });
    mapRef.set({ area });
    userRef.collection('shouts').add(shout);

    return { shoutId: shoutRef.id };
  } catch (error) {
    console.log(error);
    return;
  }
};
