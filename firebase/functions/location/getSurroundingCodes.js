const turf = require('@turf/turf');
const { encode } = require('pluscodes');
const { SIGHT_RADIUS, PLUSCODE_PRECISION } = require('./config');

module.exports = (userLocation) => {
  const userPoint = turf.point(userLocation);

  // generate four sets of coords from user location
  const NE = turf.transformTranslate(userPoint, SIGHT_RADIUS, 45, { units: 'kilometers' });
  const SE = turf.transformTranslate(userPoint, SIGHT_RADIUS, 135, { units: 'kilometers' });
  const SW = turf.transformTranslate(userPoint, SIGHT_RADIUS, 225, { units: 'kilometers' });
  const NW = turf.transformTranslate(userPoint, SIGHT_RADIUS, 315, { units: 'kilometers' });

  const surroundingCoords = [
    NE.geometry.coordinates,
    SE.geometry.coordinates,
    SW.geometry.coordinates,
    NW.geometry.coordinates,
  ];

  // encode plus codes for each set of coords
  const codes = surroundingCoords.map((coord) => {
    return encode({ longitude: coord[0], latitude: coord[1] }, PLUSCODE_PRECISION);
  });

  return codes;
};
