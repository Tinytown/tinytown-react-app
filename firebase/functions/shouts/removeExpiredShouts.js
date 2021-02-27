const admin = require('firebase-admin');

module.exports = async () => {
  const EXPIRATION_LENGTH = 604800000;
  const expiredShouts = [];
  const db = admin.firestore();

  const shoutsRef =  db.collection('shouts');
  const mapRef =  db.collection('map');
  const usersRef =  db.collection('users');

  try {
    // find expired shouts
    const snapshot = await shoutsRef.where('createdAt', '<', Date.now() - EXPIRATION_LENGTH).get();

    // remove from shouts collection
    snapshot.forEach((doc) => {
      expiredShouts.push(doc.data());
      shoutsRef.doc(doc.id).delete();
    });

    // remove from map and users collections
    expiredShouts.forEach(({ id, plusCode, uid }) => {
      mapRef.doc(plusCode).collection('shouts')
        .doc(id)
        .delete();

      usersRef.doc(uid).collection('shouts')
        .doc(id)
        .delete();
    });

    console.log(`Removed ${expiredShouts.length} expired shouts`);
  } catch (error) {
    console.log(error);
  }
};
