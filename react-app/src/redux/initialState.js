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
    settings: {
      notifications: null,
      backgroundGeo: null,
    },
    onboarding: {
      shouts: 'active',
      shoutTimestamp: null,
    },
  },
  shouts: {
    local: [],
    opened: [],
    notifications: [],
    loading: true,
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
