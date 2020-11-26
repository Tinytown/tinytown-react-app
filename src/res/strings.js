import Platform from 'react-native'
import appConfig from '../../app.json';


export const button = {
  goToLocation: 'Go to my location',
  logIn: 'Log in with Twitter',
  shout: 'Shout'
};

export const dialog = {
  location: {
    title: `Turn on Location`,
    body: `The ${appConfig.displayName} app is not very useful without access to your location.`,
  }
}