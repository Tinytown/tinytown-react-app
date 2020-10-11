import React from 'react';
import PlaceholderIcon from './ic_placeholder_24dp'
import InfoIcon from './ic_info_24dp'
import CrosshairsIcon from './ic_crosshairs_24dp'
import MegaphoneIcon from './ic_megaphone_24dp'
import SignOutIcon from './ic_signout_24dp'
import TwitterIcon from './ic_twitter_24dp'


const Icon = props => {
  switch(props.icon) {
    case "crosshairs":
      return <CrosshairsIcon {...props} />;
    case "info":
      return <InfoIcon {...props} />;
    case "megaphone":
      return <MegaphoneIcon {...props} />;
    case "signout":
      return <SignOutIcon {...props} />;
    case "twitter":
      return <TwitterIcon {...props} />;
    default:
      return <PlaceholderIcon {...props} />;
  }
}
export default Icon;
