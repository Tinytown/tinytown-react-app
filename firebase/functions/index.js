const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./config/serviceAccount.json');
const config = require('./config');
const signOut = require('./auth/signOut');
const createShout = require('./shouts/createShout');
const checkTwitterGeo = require('./shouts/checkTwitterGeo');
const removeExpiredShouts = require('./shouts/removeExpiredShouts');
const storeLocation = require('./location/storeLocation');
const cleanLocationUpdates = require('./location/cleanLocationUpdates');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.DATABASE_URL,
});

exports.signOut = functions.https.onCall(signOut);
exports.createShout = functions.https.onCall(createShout);
exports.checkTwitterGeo = functions.https.onCall(checkTwitterGeo);
exports.removeExpiredShouts = functions.pubsub.schedule('every week').onRun(removeExpiredShouts);
exports.storeLocation = functions.https.onCall(storeLocation);
exports.cleanLocationUpdates = functions.firestore.document('users/{uid}/devices/{deviceId}/locations/{locationId}')
  .onCreate(cleanLocationUpdates);
