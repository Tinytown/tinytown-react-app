const functions = require('firebase-functions');

// Use firebase config when deployed to firebase
const deployedToFirebase = process.env.NODE_ENV === 'prod';
if (deployedToFirebase) {
  module.exports = functions.config().env;
} else {
  module.exports = require('../../../react-app/src/config/env.config');
}

