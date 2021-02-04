import COLORS from '../colors';
import SHAPES from '../shapes';

export default (theme) => {
  let backgroundTheme = {};
  let textTheme = {};

  switch (theme) {
  case 'green':
    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray900,
      borderColor: COLORS.grassGreen600,
    };
    keyColor = COLORS.grassGreen600;
    textTheme = {
      color: COLORS.justWhite,
    };

    return  [backgroundTheme, keyColor, textTheme];

  case 'blue':
    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray900,
      borderColor: COLORS.skyBlue600,
    };
    keyColor = COLORS.skyBlue600;
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
