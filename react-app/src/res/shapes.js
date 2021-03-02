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
  // ELEVATION - GRAYS
  elevLightGray0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.asphaltGray50,
  },

  elevDarkGray0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.asphaltGray700,
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
    ...elev2,
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
  elevRed0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.bubblegumRed100,
  },

  elevRed2: {
    shadowColor: COLORS.bubblegumRed400,
    ...elev2,
  },

  elevRed5: {
    shadowColor: COLORS.bubblegumRed400,
    ...elev5,
  },

  elevPurple5: {
    shadowColor: COLORS.flowerPurple400,
    ...elev5,
  },

  elevLime5: {
    shadowColor: COLORS.funLime400,
    ...elev5,
  },

  elevCyan0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.poolCyan100,
  },

  elevCyan2: {
    shadowColor: COLORS.poolCyan400,
    ...elev2,
  },

  elevCyan5: {
    shadowColor: COLORS.poolCyan400,
    ...elev5,
  },

  elevOrange5: {
    shadowColor: COLORS.trafficOrange400,
    ...elev5,
  },

  elevDarkBlue0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.skyBlue400,
  },

  elevLightBlue0: {
    borderWidth: normalizeValue(2),
    borderColor: COLORS.skyBlue100,
  },

  elevBlue2: {
    shadowColor: COLORS.skyBlue400,
    ...elev2,
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

