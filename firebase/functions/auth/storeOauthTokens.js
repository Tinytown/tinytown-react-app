const admin = require('firebase-admin');

module.exports = (data, context) => {
  const { token, secret } = data;
  const { auth } = context;

  // Remove '.com' from provider Id
  const providerId = String(data.providerId).replace(/\..*$/g, '');

  admin.database().ref(`users/${auth.uid}/oauth/${providerId}`)
    .update({ token, secret })
    .then(() => console.log(`${providerId} OAuth updated`))
    .catch((err) => console.log(err));
};
