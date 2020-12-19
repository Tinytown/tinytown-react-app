import appConfig from 'root/app.json';

export const menuItem = {
  about: 'About',
  signOut: 'Sign Out',
};

export const button = {
  goToLocation: 'Go to my location',
  logIn: 'Log in with Twitter',
  shout: 'Shout',
};

export const dialog = {
  location: {
    title: 'Turn on Location',
    body: `The ${appConfig.displayName} app is not very useful without access to your location.`,
  },
};
