import appConfig from 'root/app.json';

export default {
  menuItem: {
    about: 'About',
    signOut: 'Sign Out',
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
    },
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
};

