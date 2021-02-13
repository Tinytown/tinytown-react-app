const functions = require('firebase-functions');

// Use firebase config when deployed to firebase
if (process.env.NODE_ENV === 'production') {
  module.exports = functions.config().env;
} else {
  module.exports = require('../../../react-app/src/config/env.config');
}

