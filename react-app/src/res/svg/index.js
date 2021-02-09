import React from 'react';
import { Platform } from 'react-native';

import CloseIcon from './ic_close_24dp';
import CrosshairsIcon from './ic_crosshairs_24dp';
import InfoIcon from './ic_info_circle_24dp';
import MegaphoneIcon from './ic_megaphone_24dp';
import OverflowDroidIcon from './ic_overflow_droid_24dp';
import OverflowiOSIcon from './ic_overflow_ios_24dp';
import PlaceholderIcon from './ic_placeholder_24dp';
import SettingsIcon from './ic_settings_24dp';
import ShareDroidIcon from './ic_share_droid_24dp';
import ShareiOSIcon from './ic_share_ios_24dp';
import SignOutIcon from './ic_sign_out_24dp';
import TwitterIcon from './ic_twitter_24dp';

const IconRepo = {
  close: CloseIcon,
  crosshairs: CrosshairsIcon,
  info: InfoIcon,
  megaphone: MegaphoneIcon,
  overflow: Platform.OS === 'android' ? OverflowDroidIcon : OverflowiOSIcon,
  settings: SettingsIcon,
  share: Platform.OS === 'android' ? ShareDroidIcon : ShareiOSIcon,
  signOut: SignOutIcon,
  twitter: TwitterIcon,
};

export default (props) => {
  const ValidatedIcon = IconRepo[props.icon] || PlaceholderIcon;
  return <ValidatedIcon {...props} />;
};
