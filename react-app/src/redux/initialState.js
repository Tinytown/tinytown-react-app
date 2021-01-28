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
    userVisible: null,
    hasPermission: false,
    goToUser: false,
  },
  app: {
    active: true,
    storageLoaded: false,
  },
});

export default INITIAL_STATE;
