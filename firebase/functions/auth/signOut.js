const admin = require('firebase-admin');

module.exports = async (data) => {
  const { deviceId, uid } = data;
  const db = admin.firestore();

  try {
    db.collection('users').doc(uid)
      .collection('devices')
      .doc(deviceId)
      .delete();
  } catch (error) {
    db.collection('');
  }
};
