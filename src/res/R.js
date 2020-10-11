// Combines all style variables under one file: import R from 'res/R' 

import * as colors from './colors';
import * as typography from './typography';
import * as shapes from './shapes';
import * as strings from './strings';
import * as images from './img'
import Icon from './svg'

const R = {
  colors,
  typography,
  shapes,
  strings,
  images,
  Icon
}

export default R
