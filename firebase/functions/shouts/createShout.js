/* eslint-disable camelcase*/
const admin = require('firebase-admin');

module.exports = async (data, context) => {
  const { createdAt, text, sourcePlatform, coordinates  } = data;
  const { auth } = context;

  const shoutRef = admin.database().ref('/shouts')
    .push();

  const shout = {
    created_at: createdAt,
    id: shoutRef.key,
    text,
    source_platform: sourcePlatform,
    coordinates,
    user: {
      uid: auth.uid,
      name: auth.token.name,
    },
  };

  try {
    await shoutRef.set(shout);
    await admin.database().ref(`/users/${auth.uid}/shouts/${shoutRef.key}`)
      .update(shout);
  } catch (error) {
    console.log(error);
  }
};
