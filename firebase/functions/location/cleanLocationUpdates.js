const updateLocation = require('./updateLocation');

module.exports = async (snap, context) => {
  const { location: { coords } } = snap.data();
  const { params: { uid, deviceId } } = context;

  try {
    // update location
    updateLocation(uid, deviceId, [coords.longitude, coords.latitude]);

    // delete location entry
    await snap.ref.delete();
  } catch (error) {
    console.log(error);
  }
};
