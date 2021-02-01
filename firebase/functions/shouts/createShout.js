/* eslint-disable camelcase*/
const admin = require('firebase-admin');
const OpenLocationCode = require('../library/openlocationcode');

module.exports = async (data, context) => {
  const { text, sourcePlatform, coordinates  } = data;
  const { auth } = context;

  const shout = {
    created_at: Date.now(),
    text,
    source_platform: sourcePlatform,
    coordinates,
  };

  const user = {
    uid: auth.uid,
    name: auth.token.name,
  };

  try {
    const plusCode = OpenLocationCode.encode(coordinates[1], coordinates[0], OpenLocationCode.CODE_PRECISION_WIDE);

    const shoutRef = admin.database().ref(`/shouts/${plusCode}`)
      .push();
    shout.id = shoutRef.key;
    await shoutRef.set({ ...shout, user });

    await admin.database().ref(`/users/${auth.uid}/shouts/${shoutRef.key}`)
      .set(shout);

    return { shoutId: shoutRef.key };
  } catch (error) {
    console.log(error);
    return;
  }
};
