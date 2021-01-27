
import {
  bounceAnimation,
  jiggleAnimation,
  menuAnimation,
  flipAnimation,
  pressAnimation,
  sheetAnimation } from 'res';

export default (animationType, ...args) => {
  switch (animationType) {
  case 'bounce':
    return bounceAnimation();
  case 'jiggle':
    return jiggleAnimation();
  case 'menu':
    return menuAnimation();
  case 'flip':
    return flipAnimation(...args);
  case 'press':
    return pressAnimation();
  case 'sheet':
    return sheetAnimation(...args);
  default:
    return [];
  }
};
