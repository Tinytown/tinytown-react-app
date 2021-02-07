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
  dialog: {
    location: {
      title: 'Turn on Location',
      body: `The ${appConfig.displayName} app is not very useful without access to your location.`,
    },
  },
  placeholder: {
    shoutBox: 'What\'s happening nearby?',
  },
  onboarding: {
    welcome: 'Welcome to',
  },
};

