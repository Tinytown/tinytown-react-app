/* eslint-disable max-len */
import appConfig from 'root/app.json';

export default {
  core: {
    about: 'About',
    tagline: 'Made with ❤️ for the local village',
    on: 'on',
    off: 'off',
  },

  social: {
    feature: 'Request a feature',
    help: 'Help and Feedback',
    discord: 'Join our Discord',
    twitter: 'Follow us on Twitter',
  },

  dialog: {
    location: {
      title: 'Location is not enabled',
      body: 'To use location, you must enable it in settings.',
    },
    backgroundGeo: {
      title: 'Background location is not enabled',
      body: 'To use background location, you must select "Allow all the time" in location settings and "Allow" in physical activity settings.',
    },
    mockLocation: {
      title: 'Not So Fast, Bucko',
      body: 'It looks like you\'re using a GPS Spoofing application and that\'s a big no-no around these parts.',
    },
    shout: {
      title: 'Discard Shout?',
    },
    twitterGeo: {
      title: 'Enable location on Twitter',
      body: 'Before using this feature in Tinytown, it needs to be enabled on your Twitter account.',
    },
    notifications: {
      title: 'Push notifications',
      body: 'If you\'d like to enable notifications, you can do so in Settings.',
    },
    unableSettings: 'Unable to open settings',
  },

  onboarding: {
    welcome: 'Welcome to',
    goToLocation: 'Go to my location',
    shoutIntro: {
      title: 'LOUD NOISES!',
      body: 'This is a shout, they help you stay in the loop on what\'s happening nearby and then dissapear after a week.',
    },
  },

  features: {
    notifications: {
      title: 'Push notifications',
      body: 'Be the first to know when there\'s a new shout near your location.',
    },
    backgroundGeo: {
      title: 'Use background location',
      body: 'Use your most recent location to receive notifications when the Tinytown app is closed.',
    },
  },

  secrets: {
    wololo: 'Niko, I\'ve a feeling we\'re not in the Tinytown website anymore.',
  },

  links: {
    wololo: 'https://twitter.com/search?q=wolologang',
    feature: 'https://ttown.app/feature-requests',
    help: 'https://ttown.app/feedback',
    discord: 'https://ttown.app/discord',
    twitter: 'https://twitter.com/GetTinytown',
    twitterGeo: 'https://twitter.com/settings/location',
  },

  actions: {
    shout: 'Shout',
    cancel: 'Cancel',
    tryAgain: 'Try again',
    discard: 'Discard',
    dismiss: 'Dismiss',
    turnOn: 'Turn on',
  },

  navigation: {
    goToSettings: 'Go to Settings',
    goToTwitter: 'Go to Twitter',
    settings: 'Settings',
  },

  auth: {
    logIn: 'Log in with Twitter',
    signOut: 'Sign Out',
  },

  shouts: {
    shoutBox: 'What\'s happening nearby?',
    header: 'Megaphone Settings',
    settingsChip: {
      default: 'Megaphone Settings',
      twitter: 'Sharing on Twitter',
      twitterGeo: 'Sharing location on Twitter',
      lann: 'Lann Mode is enabled',
    },
    lannMode: {
      title: 'Lann Mode',
      body: 'Shouts will be stored with random location information for testing purposes.',
    },
    twitter: {
      title: 'Send to Twitter',
      body: 'Your Shouts will appear on your Twitter Timeline.',
      location: 'Show your location on Twitter',
    },
  },
  connectivity: {
    offline: 'Can\'t connect to the Internet',
  },
};

