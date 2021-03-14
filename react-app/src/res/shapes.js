import COLORS from './colors';
import { normalizeValue } from './functions/normalizeStyles';

const elev5 = {
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.5,
  shadowRadius: 7.49,

  elevation: 12,
};

const elev2 = {
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.3,
  shadowRadius: 3.84,

  elevation: 5,
};

export default {
  // GRAY ELEVATION
  elevLightGray0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.asphaltGray[50],
  },

  elevDarkGray0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.asphaltGray[700],
  },

  elevGray1: {
    shadowColor: COLORS.asphaltGray[800],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.22,

    elevation: 3,
  },

  elevGray2: {
    shadowColor: COLORS.asphaltGray[800],
    ...elev2,
  },

  elevGray3: {
    shadowColor: COLORS.asphaltGray[800],
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4.65,

    elevation: 7,
  },

  elevGray4: {
    shadowColor: COLORS.asphaltGray[800],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5.46,
    elevation: 9,
  },

  elevGray5: {
    shadowColor: COLORS.asphaltGray[800],
    ...elev5,
  },

  // RED ELEVATION
  elevDarkRed0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.bubblegumRed[400],
  },

  elevLightRed0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.bubblegumRed[100],
  },

  elevRed2: {
    shadowColor: COLORS.bubblegumRed[400],
    ...elev2,
  },

  elevRed5: {
    shadowColor: COLORS.bubblegumRed[400],
    ...elev5,
  },

  // PURPLE ELEVATION
  elevPurple5: {
    shadowColor: COLORS.flowerPurple[400],
    ...elev5,
  },

  // LIME ELEVATION
  elevLime5: {
    shadowColor: COLORS.funLime[400],
    ...elev5,
  },

  // CYAN ELEVATION
  elevCyan0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.poolCyan[100],
  },

  elevCyan2: {
    shadowColor: COLORS.poolCyan[400],
    ...elev2,
  },

  elevCyan5: {
    shadowColor: COLORS.poolCyan[400],
    ...elev5,
  },

  // ORANGE ELEVATION
  elevOrange5: {
    shadowColor: COLORS.trafficOrange[400],
    ...elev5,
  },

  // BLUE ELEVATION
  elevDarkBlue0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.skyBlue[400],
  },

  elevLightBlue0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.skyBlue[100],
  },

  elevBlue2: {
    shadowColor: COLORS.skyBlue[400],
    ...elev2,
  },

  elevBlue5: {
    shadowColor: COLORS.skyBlue[400],
    ...elev5,
  },

  // BRANDS ELEVATION
  elevTwitter0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.brands.twitter,
  },

  elevTwitter5: {
    shadowColor: COLORS.brands.twitter,
    ...elev5,
  },

  elevTwitter2: {
    shadowColor: COLORS.brands.twitter,
    ...elev2,
  },

  // CORNER RADIUS
  radiusSm: 4,
  radiusMd: 8,
  radiusLg: 16,
  radiusAll: 100,
};

