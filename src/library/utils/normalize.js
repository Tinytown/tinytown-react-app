import * as R from 'ramda';
const {cond, T: otherwise, identity, always} = R;
import { PixelRatio, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';


const ratio = cond([
  [r => r > 0 && r <= 0.75, always(0.75)],
  [r => r > 0.75 && r <= 1, always(1)],
  [r => r > 1 && r <= 1.5, always(1.5)],
  [r => r > 1.5 && r <= 2, always(2)],
  [r => r > 2 && r <= 3, always(3)],
  [r => r > 3, always(4)],
  [otherwise, identity]
])(PixelRatio.get());


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