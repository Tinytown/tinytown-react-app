const INITIAL_STATE = Object.freeze({
  auth: {
    isSignedIn: null,
    user: {
      photoURL: '',
      displayName: '',
      uid: '',
    },
  },
  location: {
    user: null,
    hasPermission: false,
    goToUser: false,
    userVisible: true,
  },
  app: {
    active: true,
    storageLoaded: false,
  },
});

export default INITIAL_STATE;
