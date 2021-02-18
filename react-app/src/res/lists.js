import STRINGS from './strings';
import COLORS from './colors';

const {
  shouts: { twitter, lannMode },
} = STRINGS;

export default {
  megaphone:
    [
      {
        key: 'twitter',
        title: twitter.title,
        body: twitter.body,
        icon: 'twitter',
        activeColor: COLORS.twitter,
        theme: 'hairline dark',
        children: [
          {
            key: 'location',
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
    ],
};
