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

Platform.OS === 'android'
const Icon = props => {
  if (props.icon === 'crosshairs') {
    return <CrosshairsIcon {...props} />;

  } else if (props.icon === 'megaphone') {
    return <MegaphoneIcon {...props} />;

  } else if (props.icon === 'twitter') {
    return <TwitterIcon {...props} />;

  } else if (props.icon === 'close') {
    return <CloseIcon {...props} />;

  } else if (props.icon === 'share' && Platform.OS === 'android') {
    return <ShareDroidIcon {...props} />;

  } else if (props.icon === 'share' && Platform.OS === 'ios') {
    return <ShareiOSIcon {...props} />;

  } else if (props.icon === 'overflow' && Platform.OS === 'android') {
    return <OverflowDroidIcon {...props} />;

  } else if (props.icon === 'overflow' && Platform.OS === 'ios') {
    return <OverflowiOSIcon {...props} />;

  } else if (props.icon === 'info') {
    return <InfoIcon {...props} />;

  } else if (props.icon === 'sign_out') {
    return <SignOutIcon {...props} />;
  
  } else {
    return <PlaceholderIcon {...props} />;
  }
};

export default Icon;
