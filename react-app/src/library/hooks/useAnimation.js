
import {
  bounceAnimation,
  dialogAnimation,
  jiggleAnimation,
  menuAnimation,
  flipAnimation,
  pressAnimation,
  ringAnimation,
  shakeAnimation,
  sheetAnimation,
  showAnimation,
  slideAnimation,
} from './animations';

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
  case 'ring':
    return ringAnimation(...args);
  case 'shake':
    return shakeAnimation();
  case 'sheet':
    return sheetAnimation(...args);
  case 'show':
    return showAnimation(...args);
  case 'slide':
    return slideAnimation(...args);
  default:
    return [];
  }
};
