
import {
  bounceAnimation,
  dialogAnimation,
  jiggleAnimation,
  menuAnimation,
  flipAnimation,
  pressAnimation,
  sheetAnimation,
  showAnimation } from './animations';

export default (animationType, ...args) => {
  switch (animationType) {
  case 'bounce':
    return bounceAnimation();
  case 'dialog':
    return dialogAnimation();
  case 'jiggle':
    return jiggleAnimation(...args);
  case 'menu':
    return menuAnimation();
  case 'flip':
    return flipAnimation(...args);
  case 'press':
    return pressAnimation();
  case 'sheet':
    return sheetAnimation(...args);
  case 'show':
    return showAnimation(...args);
  default:
    return [];
  }
};
