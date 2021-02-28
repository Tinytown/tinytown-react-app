import COLORS from '../colors';
import SHAPES from '../shapes';

export default (theme) => {
  let backgroundTheme = {};

  switch (theme) {
  case 'cyan':
    backgroundTheme = {
      backgroundColor: COLORS.poolCyan400,
      borderColor: COLORS.justWhite,
      borderWidth: 2,
      ...SHAPES.elevCyan5,
    };
    keyColor = COLORS.justWhite;
    contentColor = COLORS.asphaltGray800;

    return  [backgroundTheme, keyColor, contentColor];

  case 'blue':
    backgroundTheme = {
      backgroundColor: COLORS.skyBlue400,
      borderColor: COLORS.justWhite,
      borderWidth: 2,
      ...SHAPES.elevBlue5,
    };
    keyColor = COLORS.justWhite;
    contentColor = COLORS.justWhite;

    return  [backgroundTheme, keyColor, contentColor];

  case 'red':
    backgroundTheme = {
      backgroundColor: COLORS.bubblegumRed400,
      borderColor: COLORS.justWhite,
      borderWidth: 2,
      ...SHAPES.elevRed5,
    };
    keyColor = COLORS.justWhite;
    contentColor = COLORS.justWhite;

    return  [backgroundTheme, keyColor, contentColor];

  case 'transparent':
    backgroundTheme = {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 2,
    };
    keyColor = 'transparent';
    contentColor = COLORS.asphaltGray800;

    return  [backgroundTheme, keyColor, contentColor];

  case 'white':
    backgroundTheme = {
      backgroundColor: COLORS.justWhite,
      borderColor: COLORS.justWhite,
      borderWidth: 2,
    };
    keyColor = COLORS.asphaltGray800;
    contentColor = COLORS.asphaltGray800;

    return  [backgroundTheme, keyColor, contentColor];

  case 'dark elevated':
    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray800,
      borderColor: COLORS.asphaltGray800,
      borderWidth: 2,
      ...SHAPES.elevGray2,
    };
    keyColor = COLORS.justWhite;
    contentColor = COLORS.justWhite;

    return  [backgroundTheme, keyColor, contentColor];

  case 'disabled':
    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray50,
      borderColor: COLORS.asphaltGray100,
      borderWidth: 2,
    };
    keyColor = 'transparent';
    contentColor = COLORS.asphaltGray200;

    return  [backgroundTheme, keyColor, contentColor];

  case 'hairline':
    backgroundTheme = {
      backgroundColor: COLORS.justWhite,
      ...SHAPES.elevHairline,
    };
    keyColor = COLORS.asphaltGray800;
    contentColor = COLORS.asphaltGray800;

    return  [backgroundTheme, keyColor, contentColor];

  case 'elevated':
    backgroundTheme = {
      backgroundColor: COLORS.justWhite,
      borderWidth: 2,
      ...SHAPES.elevGray5,
    };
    keyColor = COLORS.justWhite;
    contentColor = COLORS.asphaltGray900;

    return  [backgroundTheme, keyColor, contentColor];

  case 'hairline red':
    backgroundTheme = {
      backgroundColor: COLORS.justWhite,
      ...SHAPES.elevHairline,
      borderColor: COLORS.bubblegumRed100,
    };
    keyColor = COLORS.bubblegumRed400;
    contentColor = COLORS.asphaltGray800;

    return  [backgroundTheme, keyColor, contentColor];

  case 'hairline blue':
    backgroundTheme = {
      backgroundColor: COLORS.justWhite,
      ...SHAPES.elevHairline,
      borderColor: COLORS.skyBlue100,
    };
    keyColor = COLORS.skyBlue400;
    contentColor = COLORS.asphaltGray800;

    return  [backgroundTheme, keyColor, contentColor];

  case 'hairline dark':
    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray900,
      ...SHAPES.elevHairline,
      borderColor: COLORS.asphaltGray700,
    };
    keyColor = COLORS.justWhite;
    contentColor = COLORS.asphaltGray300;

    return  [backgroundTheme, keyColor, contentColor];

  default:
    backgroundTheme = {
      backgroundColor: COLORS.justWhite,
      borderColor: COLORS.justWhite,
      borderWidth: 2,
      ...SHAPES.elevGray2,
    };
    keyColor = COLORS.asphaltGray800;
    contentColor = COLORS.asphaltGray800;

    return  [backgroundTheme, keyColor, contentColor];
  }
};
