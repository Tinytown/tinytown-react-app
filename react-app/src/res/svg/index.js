import React from 'react';
import { Platform } from 'react-native';

import ClockIcon from './ic_clock_24dp';
import CloseIcon from './ic_close_24dp';
import CrosshairsIcon from './ic_crosshairs_24dp';
import DiscordIcon from './ic_discord_24dp';
import HelpIcon from './ic_help_24dp';
import InfoIcon from './ic_info_circle_24dp';
import LabIcon from './ic_lab_24dp';
import LightbulbIcon from './ic_lightbulb_24dp';
import MegaphoneIcon from './ic_megaphone_24dp';
import NotificationsIcon from './ic_notifications_24dp';
import OpenExternalIcon from './ic_open_external_24dp';
import OverflowDroidIcon from './ic_overflow_droid_24dp';
import OverflowiOSIcon from './ic_overflow_ios_24dp';
import PlaceholderIcon from './ic_placeholder_24dp';
import SettingsIcon from './ic_settings_24dp';
import ShareDroidIcon from './ic_share_droid_24dp';
import ShareiOSIcon from './ic_share_ios_24dp';
import SignOutIcon from './ic_sign_out_24dp';
import TwitterIcon from './ic_twitter_24dp';

const IconRepo = {
  clock: ClockIcon,
  close: CloseIcon,
  crosshairs: CrosshairsIcon,
  discord: DiscordIcon,
  help: HelpIcon,
  info: InfoIcon,
  lab: LabIcon,
  lightbulb: LightbulbIcon,
  megaphone: MegaphoneIcon,
  notifications: NotificationsIcon,
  openExternal: OpenExternalIcon,
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
