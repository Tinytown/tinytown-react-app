const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./config/serviceAccount.json');
const config = require('./config/env.config');
const storeOauthTokens = require('./auth/storeOauthTokens');
const createShout = require('./shouts/createShout');
const checkTwitterGeo = require('./shouts/checkTwitterGeo');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.DATABASE_URL,
});

exports.storeOauthTokens = functions.https.onCall(storeOauthTokens);
exports.createShout = functions.https.onCall(createShout);
exports.checkTwitterGeo = functions.https.onCall(checkTwitterGeo);
