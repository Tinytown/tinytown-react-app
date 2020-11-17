import * as R from 'ramda';
const { cond, T: otherwise, identity, always } = R;
import { PixelRatio, StyleSheet } from 'react-native';

const ratio = cond([
  [(r) => r > 0 && r <= 0.75, always(0.75)],
  [(r) => r > 0.75 && r <= 1, always(1)],
  [(r) => r > 1 && r <= 1.5, always(1.5)],
  [(r) => r > 1.5 && r <= 2, always(2)],
  [(r) => r > 2 && r <= 3, always(3)],
  [(r) => r > 3, always(4)],
  [otherwise, identity],
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
  const isNumber = R.is(Number)
  const isInTarget = (property) => targetProperties.includes(property)
  const propertyToNormalize = (property, value) => isInTarget(property) && isNumber(value);

  const propOverride = (style) => {
    return R.mapObjIndexed((value, property) => {
      return (propertyToNormalize(property, value) ? normalize(value) : value)
    }, style)
  }
  const normalizedStyles = R.map(propOverride, styles)
  return StyleSheet.create(normalizedStyles);
};

export default normalize;
