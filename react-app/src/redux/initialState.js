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
    settings: {
      notifications: null,
      backgroundGeo: null,
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
    onboarding: {
      state: 'active',
      timestamp: null,
      location: null,
    },
  },
});

export default INITIAL_STATE;
