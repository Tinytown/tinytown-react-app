const admin = require('firebase-admin');

module.exports = async (data, context) => {
  const { token, secret } = data;
  const { auth: { uid, token: { name } } } = context;
  const db = admin.firestore();

  // Remove '.com' from provider Id
  const providerId = String(data.providerId).replace(/\..*$/g, '');

  const userRef = db.collection('users').doc(uid);
  const oauthRef = userRef.collection('oauth').doc(providerId);

  try {
    await userRef.set({ uid, name }, { merge: true });
    await oauthRef.set({ token, secret });
  } catch (error) {
    console.log(error);
  }
};
