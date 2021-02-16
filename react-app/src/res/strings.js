import appConfig from 'root/app.json';

const basics = {
  cancel: 'Cancel',
  tryAgain: 'Try again',
};

export default {
  menuItem: {
    about: 'About',
    signOut: 'Sign Out',
    feature: 'Request a feature',
    help: 'Help and Feedback',
    discord: 'Join our Discord',
    twitter: 'Follow us on Twitter',
  },
  button: {
    goToLocation: 'Go to my location',
    logIn: 'Log in with Twitter',
    shout: 'Shout',
  },
  chip: {
    lannOff: 'Lann Mode is off',
    lannOn: 'Lann Mode is on',
  },
  dialog: {
    location: {
      title: 'Turn on Location',
      body: `The ${appConfig.displayName} app is not very useful without access to your location.`,
      buttonPrimary: 'Go to Settings',
      buttonSecondary: basics.cancel,
    },
    mockLocation: {
      title: 'Not So Fast, Bucko',
      body: 'It looks like you\'re using a GPS Spoofing application and that\'s a big no-no around these parts.',
      button: basics.tryAgain,
    },
    tagline: 'Made with ❤️ for the local village',
  },
  toast: {
    lannMode: 'Shout will be stored with random location information for testing purposes.',
  },
  placeholder: {
    shoutBox: 'What\'s happening nearby?',
  },
  onboarding: {
    welcome: 'Welcome to',
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
};

