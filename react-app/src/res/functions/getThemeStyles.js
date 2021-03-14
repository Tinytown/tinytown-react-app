/* eslint-disable prefer-destructuring */
import SHAPES from '../shapes';
import { normalizeValue } from './normalizeStyles';
import getColors from './getColors';

const DEFAULT_THEME = 'lt-white-hairline';

const getLightTheme = (color, elevation) => {
  let backgroundTheme;
  let iconColor;
  let labelColor;
  let rippleColor;
  let auxColor1;
  let auxColor2;

  const COLORS = getColors();

  switch (color) {
  // CYAN THEMES - LIGHT
  case 'cyan':
    iconColor = COLORS.asphaltGray[800];
    labelColor = COLORS.asphaltGray[800];
    rippleColor = COLORS.basics.justWhite;

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.poolCyan[400],
        borderColor: COLORS.basics.justWhite,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevCyan5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.poolCyan[400],
        borderColor: COLORS.poolCyan[400],
        borderWidth: normalizeValue(2),
        ...SHAPES.elevCyan2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.poolCyan[400],
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.basics.justWhite,
        ...SHAPES.elevCyan0,
      };
      iconColor = COLORS.poolCyan[600];
      labelColor = COLORS.asphaltGray[800];
      rippleColor = COLORS.poolCyan[600];
      auxColor1 = COLORS.asphaltGray[600];
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor, auxColor1 };

  // BLUE THEMES - LIGHT
  case 'blue':
    iconColor = COLORS.basics.justWhite;
    labelColor = COLORS.basics.justWhite;
    rippleColor = COLORS.basics.justWhite;

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.skyBlue[400],
        borderColor: COLORS.basics.justWhite,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevBlue5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.skyBlue[400],
        borderColor: COLORS.skyBlue[400],
        borderWidth: normalizeValue(2),
        ...SHAPES.elevBlue2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.skyBlue[400],
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.basics.justWhite,
        ...SHAPES.elevLightBlue0,
      };
      iconColor = COLORS.skyBlue[400];
      labelColor = COLORS.asphaltGray[800];
      rippleColor = COLORS.skyBlue[400];
      auxColor1 = COLORS.asphaltGray[600];
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor };

  // RED THEMES - LIGHT
  case 'red':
    iconColor = COLORS.basics.justWhite;
    labelColor = COLORS.basics.justWhite;
    rippleColor = COLORS.basics.justWhite;

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.bubblegumRed[400],
        borderColor: COLORS.basics.justWhite,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevRed5,
      };
      auxColor1 = COLORS.bubblegumRed[400];
      auxColor2 = COLORS.basics.justWhite;
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.bubblegumRed[400],
        borderColor: COLORS.bubblegumRed[400],
        borderWidth: normalizeValue(2),
        ...SHAPES.elevRed2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.bubblegumRed[400],
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.basics.justWhite,
        ...SHAPES.elevLightRed0,
      };
      iconColor = COLORS.bubblegumRed[400];
      labelColor = COLORS.asphaltGray[800];
      rippleColor = COLORS.bubblegumRed[400];
      auxColor1 = COLORS.asphaltGray[600];
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor, auxColor1, auxColor2 };

  // WHITE THEMES - LIGHT
  case 'white':
    iconColor = COLORS.asphaltGray[800];
    labelColor = COLORS.asphaltGray[800];
    rippleColor = COLORS.asphaltGray[800];

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.basics.justWhite,
        borderColor: COLORS.asphaltGray[800],
        borderWidth: normalizeValue(2),
        ...SHAPES.elevGray5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.basics.justWhite,
        borderColor: COLORS.basics.justWhite,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevGray2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.basics.justWhite,
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.basics.justWhite,
        ...SHAPES.elevLightGray0,
      };
      auxColor1 = COLORS.asphaltGray[600];
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor, auxColor1 };

  case 'disabled':
    iconColor = COLORS.asphaltGray[300];
    labelColor = COLORS.asphaltGray[300];
    rippleColor = 'transparent';

    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray[50],
      borderColor: COLORS.asphaltGray[100],
      borderWidth: 2,
    };
    return  { backgroundTheme, iconColor, labelColor, rippleColor };
  };
};

const getDarkTheme = (color, elevation) => {
  let backgroundTheme;
  let iconColor;
  let labelColor;
  let rippleColor;

  const COLORS = getColors();

  switch (color) {
  // TWITTER THEMES - DARK
  case 'twitter':
    iconColor = COLORS.asphaltGray[900];
    labelColor = COLORS.asphaltGray[900];
    rippleColor = COLORS.asphaltGray[900];

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.brands.twitter,
        borderColor: COLORS.asphaltGray[900],
        borderWidth: normalizeValue(2),
        ...SHAPES.elevTwitter5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.brands.twitter,
        borderColor: COLORS.brands.twitter,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevTwitter2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.brands.twitter,
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.asphaltGray[900],
        ...SHAPES.elevTwitter0,
      };
      iconColor = COLORS.brands.twitter;
      labelColor = COLORS.basics.justWhite;
      rippleColor = COLORS.brands.twitter;
      auxColor1 = COLORS.asphaltGray[300];
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor, auxColor1 };

  // RED THEMES - DARK
  case 'red':
    iconColor = COLORS.asphaltGray[900];
    labelColor = COLORS.asphaltGray[900];
    rippleColor = COLORS.asphaltGray[900];
    auxColor1 = COLORS.asphaltGray[300];

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.bubblegumRed[400],
        borderColor: COLORS.asphaltGray[900],
        borderWidth: normalizeValue(2),
        ...SHAPES.elevRed5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.bubblegumRed[400],
        borderColor: COLORS.bubblegumRed[400],
        borderWidth: normalizeValue(2),
        ...SHAPES.elevRed2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.bubblegumRed[400],
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.asphaltGray[900],
        ...SHAPES.elevDarkRed0,
      };
      iconColor = COLORS.bubblegumRed[400];
      labelColor = COLORS.basics.justWhite;
      rippleColor = COLORS.bubblegumRed[400];
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor, auxColor1 };

  // GRAY THEMES - DARK
  case 'gray':
    iconColor = COLORS.basics.justWhite;
    labelColor = COLORS.basics.justWhite;
    rippleColor = COLORS.basics.justWhite;
    auxColor1 = COLORS.basics.justWhite;
    auxColor2 = COLORS.asphaltGray[900];

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.asphaltGray[900],
        borderColor: COLORS.basics.justWhite,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevGray5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.asphaltGray[900],
        borderColor: COLORS.asphaltGray[900],
        borderWidth: normalizeValue(2),
        ...SHAPES.elevGray2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.asphaltGray[900],
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.asphaltGray[900],
        ...SHAPES.elevDarkGray0,
      };
      auxColor1 = COLORS.asphaltGray[300];
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor, auxColor1, auxColor2 };

  case 'disabled':
    iconColor = COLORS.asphaltGray[500];
    labelColor = COLORS.asphaltGray[500];
    rippleColor = 'transparent';

    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray[800],
      borderColor: COLORS.asphaltGray[700],
      borderWidth: 2,
    };
    return  { backgroundTheme, iconColor, labelColor, rippleColor };
  }
};

export const getThemeStyles = (params = DEFAULT_THEME) => {
  const [theme, color, elevation] = params.split('-');

  let styles;
  if (theme === 'lt') {
    styles = getLightTheme(color, elevation);
  } else if (theme === 'dt') {
    styles = getDarkTheme(color, elevation);
  }

  return styles;
};

export const resolveTheme = (theme = DEFAULT_THEME, disabled, activeTheme, active) => {
  if (disabled) {
    const [th] = theme.split('-');
    return `${th}-disabled`;
  }

  return active ? activeTheme : theme;
};

export const translateElevation = (theme = DEFAULT_THEME, target = 'raised') => {
  const [th, co] = theme.split('-');
  return `${th}-${co}-${target}`;
};

