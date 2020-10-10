import { values } from 'lodash';
import { PixelRatio, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';


let ratio = PixelRatio.get();
if (ratio > 0 && ratio <= 0.75) {
  ratio = 0.75;
} else if (ratio > 0.75 && ratio <= 1) {
  ratio = 1;
} else if (ratio > 1 && ratio <= 1.5) {
  ratio = 1.5;
} else if (ratio > 1.5 && ratio <= 2) {
  ratio = 2;
} else if (ratio > 2 && ratio <= 3) {
  ratio = 3;
} else if (ratio > 3) {
  ratio = 4;
}


const normalize = (size) => {
  size = (size / PixelRatio.get()) * ratio;
  return size;
};


export const create = (
  styles,
  targetProperties = [
    'fontSize',
    'margin',
    'marginHorizontal',
    'marginVertical',
    'marginLeft',
    'marginRight',
    'padding',
    'paddingVertical',
    'paddingHorizontal',
    'paddingLeft',
    'paddingRight',
    'height',
    'width',
    'top',
    'right',
    'bottom',
    'left',
  ]
) => {
  const normalizedStyles = {};
  Object.keys(styles).forEach((key) => {
    normalizedStyles[key] = {};
    Object.keys(styles[key]).forEach((property) => {
      if (targetProperties.includes(property) && typeof (styles[key][property]) === 'number') {
        normalizedStyles[key][property] = normalize(styles[key][property]);
      } else {
        normalizedStyles[key][property] = styles[key][property];
      }
    });
  });

  return StyleSheet.create(normalizedStyles);
};

export default normalize;