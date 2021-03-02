import { useContext } from 'react';
import { Config } from 'context';

export default (key) => {
  const { STRINGS } = useContext(Config.Context);
  const { shouts, social, links } = STRINGS;

  const megaphone = [
    {
      key: 'twitter',
      title: shouts.twitter.title,
      body: shouts.twitter.body,
      icon: 'twitter',
      theme: 'dt-gray-hairline',
      activeTheme: 'dt-twitter-hairline',
      children: [
        {
          key: 'geo',
          title: shouts.twitter.location,
          icon: 'crosshairs',
        },
      ],
    },
    {
      key: 'lann',
      title: shouts.lannMode.title,
      body: shouts.lannMode.body,
      icon: 'lab',
      theme: 'dt-gray-hairline',
      activeTheme: 'dt-red-hairline',
    },
  ];

  const about = [
    {
      key: 'feature',
      label: social.feature,
      primaryIcon: 'lightbulb',
      secondaryIcon: 'openExternal',
      url: links.feature,
    },
    {
      key: 'help',
      label: social.help,
      primaryIcon: 'help',
      secondaryIcon: 'openExternal',
      url: links.help,
    },
    {
      key: 'discord',
      label: social.discord,
      primaryIcon: 'discord',
      secondaryIcon: 'openExternal',
      url: links.discord,
    },
    {
      key: 'twitter',
      label: social.twitter,
      primaryIcon: 'twitter',
      secondaryIcon: 'openExternal',
      url: links.twitter,
    },
  ];

  const settings = [

  ];

  switch (key) {
  case 'megaphone':
    return megaphone;
  case 'about':
    return about;
  case 'settings':
    return settings;
  default:
    return;
  }
};

