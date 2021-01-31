/* eslint-disable camelcase*/
const axios = require('axios');
const config = require('../config/env.config');

module.exports = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
  params: {
    access_token: config.MAPBOX_ACCESS_TOKEN,
    types: 'postcode',
  },
});
