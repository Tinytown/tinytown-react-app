import COLORS from './colors';

const elev5 = {
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.5,
  shadowRadius: 7.49,

  elevation: 12,
};

export default {
  // ELEVATION - GRAYS
  elevHairline: {
    borderWidth: 2,
    borderColor: COLORS.asphaltGray50,
  },

  elevGray1: {
    shadowColor: COLORS.asphaltGray800,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.22,

    elevation: 3,
  },

  elevGray2: {
    shadowColor: COLORS.asphaltGray800,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,

    elevation: 5,
  },

  elevGray3: {
    shadowColor: COLORS.asphaltGray800,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4.65,

    elevation: 7,
  },

  elevGray4: {
    shadowColor: COLORS.asphaltGray800,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5.46,
    elevation: 9,
  },

  elevGray5: {
    shadowColor: COLORS.asphaltGray800,
    ...elev5,
  },

  // ELEVATION - COLORS
  elevRed5: {
    shadowColor: COLORS.bubblegumRed400,
    ...elev5,
  },

  elevPurple5: {
    shadowColor: COLORS.flowerPurple600,
    ...elev5,
  },

  elevLime5: {
    shadowColor: COLORS.funLime400,
    ...elev5,
  },

  elevCyan5: {
    shadowColor: COLORS.poolCyan400,
    ...elev5,
  },

  elevOrange5: {
    shadowColor: COLORS.trafficOrange400,
    ...elev5,
  },

  elevBlue5: {
    shadowColor: COLORS.skyBlue400,
    ...elev5,
  },

  // CORNER RADIUS
  radiusSm: 4,
  radiusMd: 8,
  radiusLg: 16,
  radiusAll: 100,
};

