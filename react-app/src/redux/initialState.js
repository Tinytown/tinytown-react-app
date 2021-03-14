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
    cameraTarget: null,
    userVisible: null,
    hasPermission: false,
    goToUser: false,
  },
  app: {
    state: 'inactive',
    storageLoaded: false,
  },
  shouts: {
    local: [],
    opened: [],
    notifications: [],
    settings: {
      twitter: false,
      twitterGeo: {
        enabled: false,
        loading: false,
      },
      lann: false,
    },
  },
});

export default INITIAL_STATE;
