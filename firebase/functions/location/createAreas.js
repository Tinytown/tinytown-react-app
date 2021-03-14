const admin = require('firebase-admin');
const { decode } = require('pluscodes');

module.exports = async (plusCodes) => {
  return new Promise((resolve, reject) => {
    const db = admin.firestore();

    plusCodes.forEach(async (code, i, arr) => {
      let areaCoords = decode(code);
      await db.collection('map').doc(code)
        .set({ area: areaCoords }, { merge: true })
        .catch((error) => {
          reject();
          console.log(error);
        });
      if (i === arr.length - 1) {
        resolve();
      }
    });
  });
};
