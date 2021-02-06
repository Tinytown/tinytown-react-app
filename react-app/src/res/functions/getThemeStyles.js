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
    keyColor = COLORS.poolCyan400;
    contentColor = COLORS.asphaltGray800;

    return  [backgroundTheme, keyColor, contentColor];

  case 'blue':
    backgroundTheme = {
      backgroundColor: COLORS.skyBlue400,
      borderColor: COLORS.justWhite,
      borderWidth: 2,
      ...SHAPES.elevBlue5,
    };
    keyColor = COLORS.skyBlue400;
    contentColor = COLORS.justWhite;

    return  [backgroundTheme, keyColor, contentColor];

  case 'red':
    backgroundTheme = {
      backgroundColor: COLORS.bubblegumRed400,
      borderColor: COLORS.justWhite,
      borderWidth: 2,
      ...SHAPES.elevRed5,
    };
    keyColor = COLORS.bubblegumRed400;
    contentColor = COLORS.justWhite;

    return  [backgroundTheme, keyColor, contentColor];

  case 'transparent':
    backgroundTheme = {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    };
    keyColor = 'transparent';
    contentColor = COLORS.asphaltGray800;

    return  [backgroundTheme, keyColor, contentColor];

  case 'disabled':
    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray200,
    };
    keyColor = 'transparent';
    contentColor = COLORS.asphaltGray500;

    return  [backgroundTheme, keyColor, contentColor];

  default:
    backgroundTheme = {
      backgroundColor: COLORS.justWhite,
      ...SHAPES.elevGray2,
    };
    keyColor = COLORS.asphaltGray800;
    contentColor = COLORS.asphaltGray800;

    return  [backgroundTheme, keyColor, contentColor];
  }
};
