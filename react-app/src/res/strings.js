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
      title: 'Turn on Location',
      body: `The ${appConfig.displayName} app is not very useful without access to your location.`,
    },
    mockLocation: {
      title: 'Not So Fast, Bucko',
      body: 'It looks like you\'re using a GPS Spoofing application and that\'s a big no-no around these parts.',
    },
    shout: {
      title: 'Discard Shout?',
    },
  },

  onboarding: {
    welcome: 'Welcome to',
    goToLocation: 'Go to my location',
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
  },

  actions: {
    shout: 'Shout',
    cancel: 'Cancel',
    tryAgain: 'Try again',
    discard: 'Discard',
  },

  navigation: {
    settings: 'Go to Settings',
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
      location: 'Sharing location on Twitter',
      lann: 'Lann Mode is enabled',
    },
    lannMode: {
      title: 'Lann Mode',
      body: 'Shouts will be stored with random location information for testing purposes.',
    },
    twitter: {
      title: 'Send to Twitter',
      body: 'Your Shouts will appear on your Twitter Timeline.',
      location: 'Enable location sharing',
    },

  },
};

