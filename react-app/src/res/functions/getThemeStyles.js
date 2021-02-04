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
      borderColor: COLORS.bubblegumRed600,
    };
    keyColor = COLORS.bubblegumRed600;
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

  case 'super red':
    backgroundTheme = {
      backgroundColor: COLORS.bubblegumRed600,
      ...SHAPES.elevRed5,
    };
    keyColor = COLORS.justWhite;
    textTheme = {
      color: COLORS.justWhite,
    };

    return  [backgroundTheme, keyColor, textTheme];

  default:
    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray900,
      borderColor: COLORS.justWhite,
    };
    keyColor = COLORS.justWhite;
    textTheme = {
      color: COLORS.justWhite,
    };

    return  [backgroundTheme, keyColor, textTheme] ;
  }
};
