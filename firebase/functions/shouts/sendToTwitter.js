/* eslint-disable camelcase*/
const twitterOAuth = require('../library/twitter');

module.exports = async ({ text, sent_to: { twitterGeo }, coordinates, uid }) => {
  try {
    const twitter = await twitterOAuth(uid);
    await twitter.post('statuses/update', {
      status: text,
      ...(twitterGeo && {
        long: coordinates[0],
        lat: coordinates[1],
        display_coordinates: true,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
