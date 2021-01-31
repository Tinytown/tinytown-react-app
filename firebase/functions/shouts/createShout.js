/* eslint-disable camelcase*/
const admin = require('firebase-admin');
const geocodes = require('../library/geocodes');

module.exports = async (data, context) => {
  const { createdAt, text, sourcePlatform, coordinates  } = data;
  const { auth } = context;

  const shout = {
    created_at: createdAt,
    text,
    source_platform: sourcePlatform,
    coordinates,
  };

  const user = {
    uid: auth.uid,
    name: auth.token.name,
  };

  try {
    const { data: { features } } = await geocodes.get(`${coordinates}.json`);
    let refPath;

    if (features[0]) {
      const postcode = features[0].text;
      const { short_code } = features[0].context.find((context) =>
        context.id.includes('country'));
      refPath = `${short_code}/${postcode}`;
    } else {
      refPath = 'world';
    }

    const shoutRef = admin.database().ref(`/shouts/${refPath}`)
      .push();
    shout.id = shoutRef.key;
    await shoutRef.set({ ...shout, user });

    await admin.database().ref(`/users/${auth.uid}/shouts/${shoutRef.key}`)
      .set(shout);
  } catch (error) {
    console.log(error);
  }
};
