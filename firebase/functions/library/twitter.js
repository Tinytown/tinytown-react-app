/* eslint-disable camelcase*/
const admin = require('firebase-admin');
const config = require('../config');
const Twitter = require('twitter');

module.exports = async (uid) => {
  try {
    const db = admin.firestore();
    const oauthRef = db.collection('users').doc(uid)
      .collection('oauth')
      .doc('twitter');
    const doc = await oauthRef.get();
    const { token, secret } = doc.data();

    return new Twitter({
      consumer_key: config.TWITTER_API_KEY,
      consumer_secret: config.TWITTER_API_SECRET,
      access_token_key: token,
      access_token_secret: secret,
    });
  } catch (error) {
    console.log(error);
  }
};

