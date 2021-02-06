import COLORS from '../colors';
import SHAPES from '../shapes';

export default (theme) => {
  let backgroundTheme = {};
  let textTheme = {};

  switch (theme) {
  case 'cyan':
    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray900,
      borderColor: COLORS.poolCyan400,
    };
    keyColor = COLORS.poolCyan400;
    textTheme = {
      color: COLORS.justWhite,
    };

    return  [backgroundTheme, keyColor, textTheme];

  case 'blue':
    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray900,
      borderColor: COLORS.skyBlue400,
    };
    keyColor = COLORS.skyBlue400;
    textTheme = {
      color: COLORS.justWhite,
    };

    return  [backgroundTheme, keyColor, textTheme];

  case 'red':
    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray900,
      borderColor: COLORS.bubblegumRed400,
    };
    keyColor = COLORS.bubblegumRed400;
    textTheme = {
      color: COLORS.justWhite,
    };

    return  [backgroundTheme, keyColor, textTheme];

  case 'gray':
    backgroundTheme = {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    };
    keyColor = COLORS.asphaltGray800;
    textTheme = {
      color: COLORS.asphaltGray800,
    };

    return  [backgroundTheme, keyColor, textTheme];

  case 'disabled':
    backgroundTheme = {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    };
    keyColor = COLORS.asphaltGray800;
    textTheme = {
      color: COLORS.asphaltGray800,
    };

    return  [backgroundTheme, keyColor, textTheme];

  default:
    backgroundTheme = {
      backgroundColor: COLORS.justWhite,
      ...SHAPES.elevGray2,
    };
    keyColor = COLORS.asphaltGray800;
    textTheme = {
      color: COLORS.asphaltGray800,
    };

    return  [backgroundTheme, keyColor, textTheme] ;
  }
};
