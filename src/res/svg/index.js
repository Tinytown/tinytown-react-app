import React from 'react';
import { Platform } from 'react-native';

import PlaceholderIcon from './ic_placeholder_24dp';
import CrosshairsIcon from './ic_crosshairs_24dp';
import MegaphoneIcon from './ic_megaphone_24dp';
import TwitterIcon from './ic_twitter_24dp';
import CloseIcon from './ic_close_24dp';
import ShareDroidIcon from './ic_share_droid_24dp';
import ShareiOSIcon from './ic_share_ios_24dp';
import OverflowiOSIcon from './ic_overflow_ios_24dp';
import OverflowDroidIcon from './ic_overflow_droid_24dp';
import InfoIcon from './ic_info_circle_24dp';
import SignOutIcon from './ic_sign_out_24dp';

const IconRepo = {
  crosshairs: CrosshairsIcon,
  megaphone: MegaphoneIcon,
  twitter: TwitterIcon,
  close: CloseIcon,
  share: Platform.OS === 'android' ? ShareDroidIcon : ShareiOSIcon,
  overflow: Platform.OS=== 'android' ? OverflowDroidIcon : OverflowiOSIcon,
  info: InfoIcon,
  signOut: SignOutIcon,
}

const Icon = (props) => {
  console.log();
  const ValidatedIcon = IconRepo[props.icon] || PlaceholderIcon
  return <ValidatedIcon {...props} />
}


export default Icon;

