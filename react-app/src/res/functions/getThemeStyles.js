import COLORS from '../colors';
import SHAPES from '../shapes';
import { normalizeValue } from './normalizeStyles';

const DEFAULT_THEME = 'lt-white-hairline';

const getLightTheme = (color, elevation) => {
  let backgroundTheme;
  let iconColor;
  let labelColor;
  let rippleColor;

  switch (color) {
  // CYAN THEMES
  case 'cyan':
    iconColor = COLORS.asphaltGray800;
    labelColor = COLORS.asphaltGray800;
    rippleColor = COLORS.justWhite;

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.poolCyan400,
        borderColor: COLORS.justWhite,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevCyan5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.poolCyan400,
        borderColor: COLORS.poolCyan400,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevCyan2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.poolCyan400,
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.justWhite,
        ...SHAPES.elevCyan0,
      };
      iconColor = COLORS.poolCyan600;
      labelColor = COLORS.asphaltGray800;
      rippleColor = COLORS.poolCyan600;
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor };

  // BLUE THEMES
  case 'blue':
    iconColor = COLORS.justWhite;
    labelColor = COLORS.justWhite;
    rippleColor = COLORS.justWhite;

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.skyBlue400,
        borderColor: COLORS.justWhite,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevBlue5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.skyBlue400,
        borderColor: COLORS.skyBlue400,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevBlue2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.skyBlue400,
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.justWhite,
        ...SHAPES.elevLightBlue0,
      };
      iconColor = COLORS.skyBlue400;
      labelColor = COLORS.asphaltGray800;
      rippleColor = COLORS.skyBlue400;
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor };

  // RED THEMES
  case 'red':
    iconColor = COLORS.justWhite;
    labelColor = COLORS.justWhite;
    rippleColor = COLORS.justWhite;
    auxColor1 = COLORS.bubblegumRed400;
    auxColor2 = COLORS.justWhite;

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.bubblegumRed400,
        borderColor: COLORS.justWhite,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevRed5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.bubblegumRed400,
        borderColor: COLORS.bubblegumRed400,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevRed2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.bubblegumRed400,
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.justWhite,
        ...SHAPES.elevRed0,
      };
      iconColor = COLORS.bubblegumRed400;
      labelColor = COLORS.asphaltGray800;
      rippleColor = COLORS.bubblegumRed400;
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor, auxColor1, auxColor2 };

  // WHITE THEMES
  case 'white':
    iconColor = COLORS.asphaltGray800;
    labelColor = COLORS.asphaltGray800;
    rippleColor = COLORS.asphaltGray800;
    auxColor1 = COLORS.asphaltGray500;

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.justWhite,
        borderColor: COLORS.asphaltGray800,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevGray5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.justWhite,
        borderColor: COLORS.justWhite,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevGray2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.justWhite,
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.justWhite,
        ...SHAPES.elevLightGray0,
      };
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor, auxColor1 };

  case 'disabled':
    iconColor = COLORS.asphaltGray300;
    labelColor = COLORS.asphaltGray300;
    rippleColor = 'transparent';

    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray50,
      borderColor: COLORS.asphaltGray100,
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

  switch (color) {
  // TWITTER THEMES
  case 'twitter':
    iconColor = COLORS.asphaltGray900;
    labelColor = COLORS.asphaltGray900;
    rippleColor = COLORS.asphaltGray900;
    auxColor1 = COLORS.asphaltGray300;

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.twitter,
        borderColor: COLORS.asphaltGray900,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevBlue5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.twitter,
        borderColor: COLORS.twitter,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevBlue2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.twitter,
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.asphaltGray900,
        ...SHAPES.elevDarkTwitter0,
      };
      iconColor = COLORS.twitter;
      labelColor = COLORS.justWhite;
      rippleColor = COLORS.twitter;
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor, auxColor1 };

  // RED THEMES
  case 'red':
    iconColor = COLORS.justWhite;
    labelColor = COLORS.justWhite;
    rippleColor = COLORS.justWhite;
    auxColor1 = COLORS.bubblegumRed400;

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.bubblegumRed400,
        borderColor: COLORS.justWhite,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevRed5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.bubblegumRed400,
        borderColor: COLORS.bubblegumRed400,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevRed2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.bubblegumRed400,
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.justWhite,
        ...SHAPES.elevRed0,
      };
      iconColor = COLORS.bubblegumRed400;
      labelColor = COLORS.asphaltGray800;
      rippleColor = COLORS.bubblegumRed400;
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor, auxColor1 };
  // GRAY THEMES
  case 'gray':
    iconColor = COLORS.justWhite;
    labelColor = COLORS.justWhite;
    rippleColor = COLORS.justWhite;
    auxColor1 = COLORS.justWhite;
    auxColor2 = COLORS.asphaltGray900;

    switch (elevation) {
    case 'floating':
      backgroundTheme = {
        backgroundColor: COLORS.asphaltGray900,
        borderColor: COLORS.justWhite,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevGray5,
      };
      break;
    case 'raised':
      backgroundTheme = {
        backgroundColor: COLORS.asphaltGray900,
        borderColor: COLORS.asphaltGray900,
        borderWidth: normalizeValue(2),
        ...SHAPES.elevGray2,
      };
      break;
    case 'filled':
      backgroundTheme = {
        backgroundColor: COLORS.asphaltGray900,
      };
      break;
    case 'hairline':
      backgroundTheme = {
        backgroundColor: COLORS.asphaltGray900,
        ...SHAPES.elevDarkGray0,
      };
      auxColor1 = COLORS.asphaltGray300;
      break;
    }
    return  { backgroundTheme, iconColor, labelColor, rippleColor, auxColor1, auxColor2 };

  case 'disabled':
    iconColor = COLORS.asphaltGray500;
    labelColor = COLORS.asphaltGray500;
    rippleColor = 'transparent';

    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray800,
      borderColor: COLORS.asphaltGray700,
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

export const resolveTheme = ({ theme = DEFAULT_THEME, activeTheme, disabled, active }) => {
  if (disabled) {
    const [th] = theme.split('-');
    return `${th}-disabled`;
  }

  return active ? activeTheme : theme;
};

