import { useContext } from 'react';
import { Config } from 'context';
import COLORS from '../colors';

export default (key) => {
  const { STRINGS } = useContext(Config.Context);
  const {
    shouts: { twitter, lannMode },
  } = STRINGS;

  const megaphone = [
    {
      key: 'twitter',
      title: twitter.title,
      body: twitter.body,
      icon: 'twitter',
      activeColor: COLORS.twitter,
      theme: 'hairline dark',
      children: [
        {
          key: 'geo',
          title: twitter.location,
          icon: 'crosshairs',
        },
      ],
    },
    {
      key: 'lann',
      title: lannMode.title,
      body: lannMode.body,
      icon: 'lab',
      activeColor: COLORS.bubblegumRed400,
      theme: 'hairline dark',
    },
  ];

  switch (key) {
  case 'megaphone':
    return megaphone;
  default:
    break;
  }
};

