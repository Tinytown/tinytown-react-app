
import { bounceAnimation, jiggleAnimation, menuAnimation, flipAnimation, sheetAnimation } from 'res';

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
  case 'sheet':
    return sheetAnimation();
  default:
    return [];
  }
};
