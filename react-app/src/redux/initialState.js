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
      notifications: false,
      backgroundGeo: false,
      showNotificationsMarker: true,
    },
    onboarding: {
      shouts: 'active',
      shoutTimestamp: null,
    },
  },
  shouts: {
    local: [],
    loading: true,
  },
});

export default INITIAL_STATE;
