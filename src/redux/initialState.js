const INITIAL_STATE = Object.freeze({
  auth: {
    isSignedIn: false,
    user: {
      photoURL: '',
      displayName: '',
      uid: '',
    },
  },
  location: {
    user: null,
    hasPermission: false,
    watchingLocation: false,
    goToUser: false,
    userVisible: false,
  },
  app: {
    active: true,
    loaded: {
      map: false,
    },
  },
});

export default INITIAL_STATE;
