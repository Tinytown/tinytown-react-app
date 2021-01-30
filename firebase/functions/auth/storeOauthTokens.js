const admin = require('firebase-admin');

module.exports = (data, context) => {
  const { token, secret } = data;
  const providerId = String(data.providerId).replace(/\..*$/g, '');
  const { auth } = context;

  admin.database().ref(`users/${auth.uid}/oauth/${providerId}`)
    .update({ token, secret })
    .then(() => console.log(`${providerId} OAuth updated`))
    .catch((err) => console.log(err));
};
