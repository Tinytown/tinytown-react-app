const updateLocation = require('./updateLocation');

module.exports = async (data, context) => {
  const { deviceId, coordinates } = data;
  const { auth: { uid } } = context;

  updateLocation(uid, deviceId, coordinates);
};
