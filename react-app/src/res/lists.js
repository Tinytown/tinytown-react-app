import STRINGS from './strings';
import COLORS from './colors';

export default {
  megaphone:
    [
      {
        key: 'twitter',
        activeColor: 'blue',
        theme: 'dark',
        children: [
          {
            key: 'twitter',
            title: 'card1',
            body: 'card1',
            icon: 'twitter',
          },
          {
            key: 'location',
            title: 'child',
            icon: 'crosshairs',
          },
        ],
      },
      {
        key: 'lann',
        activeColor: 'red',
        theme: 'dark',
        children: [
          {
            key: 'lann',
            title: 'card2',
            body: 'card2',
            icon: 'lab',
          },
        ],
      },
    ],
};
