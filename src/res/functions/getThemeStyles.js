import { SHAPES, COLORS } from 'res';

export default getThemeStyles = (theme) => {
  let shadowTheme = {};
  let backgroundTheme = {};
  let iconTheme = null;
  let textTheme = {}

  switch (theme) {
  case 'green':
    shadowTheme = {
      ...SHAPES.elevGreen5,
    };
    backgroundTheme = {
      backgroundColor: COLORS.grassGreen600,
    }
    iconTheme = COLORS.asphaltGray
    textTheme = {
      color: COLORS.asphaltGray,
    }

    return { shadowTheme, backgroundTheme, iconTheme, textTheme }

  case 'blue':
    shadowTheme = {
      ...SHAPES.elevBlue5,
    };
    backgroundTheme = {
      backgroundColor: COLORS.skyBlue600,
    }
    iconTheme = COLORS.asphaltGray
    textTheme = {
      color: COLORS.asphaltGray,
    }

    return { shadowTheme, backgroundTheme, iconTheme, textTheme }

  case 'red':
    shadowTheme = {
      ...SHAPES.elevRed5,
    };
    backgroundTheme = {
      backgroundColor: COLORS.bubblegumRed600,
    }
    iconTheme = COLORS.justWhite
    textTheme = {
      color: COLORS.justWhite,
    }

    return { shadowTheme, backgroundTheme, iconTheme, textTheme }

  default:
    shadowTheme = {
      ...SHAPES.elevGray5,
    };
    backgroundTheme = {
      backgroundColor: COLORS.asphaltGray,
    }
    iconTheme = COLORS.justWhite
    textTheme = {
      color: COLORS.justWhite,
    }

    return { shadowTheme, backgroundTheme, iconTheme, textTheme };
  }
};
