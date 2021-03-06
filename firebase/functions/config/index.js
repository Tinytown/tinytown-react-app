const functions = require('firebase-functions');

// use firebase config when deployed to firebase
if (process.env.NODE_ENV === 'production') {
  module.exports = functions.config().env;
} else {
  module.exports = require('./env.config');
}

