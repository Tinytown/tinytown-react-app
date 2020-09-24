import { colors } from 'res'

// ELEVATION - GRAYS
export const elevHairline = {
  borderWidth: 2,
  borderColor: colors.snowGray,
};

export const elevGray1 = {
  shadowColor: colors.asphaltGray,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.3,
  shadowRadius: 2.22,
  
  elevation: 3,
};

export const elevGray2 = {
  shadowColor: colors.asphaltGray,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.3,
  shadowRadius: 3.84,
  
  elevation: 5,
};

export const elevGray3 = {
  shadowColor: colors.asphaltGray,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.35,
  shadowRadius: 4.65,
  
  elevation: 7,
};

export const elevGray4 = {
  shadowColor: colors.asphaltGray,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.4,
  shadowRadius: 5.46,
  
  elevation: 9,
};

const elev5 = {
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.5,
  shadowRadius: 7.49,
  
  elevation: 12,
}

export const elevGray5 = {
  shadowColor: colors.asphaltGray,
  ...elev5
};

// ELEVATION - COLORS
export const elevRed5 = {
  shadowColor: colors.bubblegumRed600,
  ...elev5
};

export const elevPurple5 = {
  shadowColor: colors.flowerPurple600,
  ...elev5
};

export const elevLime5 = {
  shadowColor: colors.funLime600,
  ...elev5
};

export const elevGreen5 = {
  shadowColor: colors.grassGreen600,
  ...elev5
};

export const elevOrange5 = {
  shadowColor: colors.trafficOrange600,
  ...elev5
};

export const elevBlue5 = {
  shadowColor: colors.skyBlue600,
  ...elev5
};

// CORNER RADIUS
export const radiusSm = 4;
export const radiusMd = 8;
export const radiusLg = 16;
export const radiusAll = 100;
