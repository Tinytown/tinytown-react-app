/* eslint-disable camelcase*/
const twitterOAuth = require('../library/twitter');

module.exports = async (data, context) => {
  const { auth } = context;

  try {
    const twitter = await twitterOAuth(auth.uid);
    const { geo_enabled } = await twitter.get('account/settings', {});
    return geo_enabled;
  } catch (error) {
    console.log(error);
  }
};
