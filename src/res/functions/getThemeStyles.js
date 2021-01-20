import COLORS from '../colors';

export default (theme) => {
  let backgroundTheme = {};
  let textTheme = {};

  switch (theme) {
  case 'green':
    backgroundTheme = {
      backgroundColor: COLORS.pitchBlack,
      borderColor: COLORS.grassGreen600,
    };
    keyColor = COLORS.grassGreen600;
    textTheme = {
      color: COLORS.justWhite,
    };

    return  [backgroundTheme, keyColor, textTheme];

  case 'blue':
    backgroundTheme = {
      backgroundColor: COLORS.pitchBlack,
      borderColor: COLORS.skyBlue600,
    };
    keyColor = COLORS.skyBlue600;
    textTheme = {
      color: COLORS.justWhite,
    };

    return  [backgroundTheme, keyColor, textTheme];

  case 'red':
    backgroundTheme = {
      backgroundColor: COLORS.pitchBlack,
      borderColor: COLORS.bubblegumRed600,
    };
    keyColor = COLORS.bubblegumRed600;
    textTheme = {
      color: COLORS.justWhite,
    };

    return  [backgroundTheme, keyColor, textTheme];

  default:
    backgroundTheme = {
      backgroundColor: COLORS.pitchBlack,
      borderColor: COLORS.justWhite,
    };
    keyColor = COLORS.justWhite;
    textTheme = {
      color: COLORS.justWhite,
    };

    return  [backgroundTheme, keyColor, textTheme] ;
  }
};
