export default {
  $id: 'http://example.com/example.json',
  $schema: 'http://json-schema.org/draft-07/schema',
  default: {},
  description: 'JSON Schema for Redux state validator.',
  examples: [
    {
      auth: {
        isSignedIn: null,
        user: {
          photoURL: 'url',
          displayName: 'name',
          uid: 'id',
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
        settings: {
          notifications: false,
          backgroundGeo: false,
        },
        onboarding: {
          shouts: 'active',
        },
      },
      shouts: {
        local: [],
        loading: true,
      },
    },
  ],
  required: ['auth', 'location', 'app', 'shouts'],
  type: 'object',
  properties: {
    auth: {
      $id: '#/properties/auth',
      default: {},
      description: 'Schema for user\'s authentication state.',
      examples: [
        {
          isSignedIn: null,
          user: {
            photoURL: 'url',
            displayName: 'name',
            uid: 'id',
          },
        },
      ],
      required: ['isSignedIn', 'user'],
      title: 'The auth schema',
      type: 'object',
      properties: {
        isSignedIn: {
          $id: '#/properties/auth/properties/isSignedIn',
          default: null,
          examples: [false],
          title: 'The isSignedIn schema',
          type: ['null', 'boolean', 'string'],
        },
        user: {
          $id: '#/properties/auth/properties/user',
          default: {},
          examples: [
            {
              photoURL: 'url',
              displayName: 'name',
              uid: 'id',
            },
          ],
          required: ['photoURL', 'displayName', 'uid'],
          title: 'The user schema',
          type: 'object',
          properties: {
            photoURL: {
              $id: '#/properties/auth/properties/user/properties/photoURL',
              default: '',
              examples: [
                'https://pbs.twimg.com/profile_images/1278735735588139009/4-DSoEkh_normal.jpg',
              ],
              title: 'The user/photoURL schema',
              type: 'string',
            },
            displayName: {
              $id: '#/properties/auth/properties/user/properties/displayName',
              default: '',
              examples: ['Tinytown_Dev'],
              title: 'The user/displayName schema',
              type: 'string',
            },
            uid: {
              $id: '#/properties/auth/properties/user/properties/uid',
              default: '',
              examples: ['2LgMdnS879UYXTEvjDjufu4e37b2'],
              title: 'The user/uid schema',
              type: 'string',
            },
          },
          additionalProperties: true,
        },
      },
      additionalProperties: true,
    },
    location: {
      $id: '#/properties/location',
      default: {},
      description: 'Schema for user\'s location state.',
      examples: [
        {
          user: null,
          hasPermission: false,
          goToUser: false,
          userVisible: true,
        },
      ],
      required: [
        'user',
        'hasPermission',
        'goToUser',
        'userVisible',
      ],
      title: 'The location schema',
      type: 'object',
      properties: {
        user: {
          $id: '#/properties/location/properties/user',
          default: null,
          examples: [-93.26392, 44.98459],
          title: 'The user schema',
          type: ['null', 'array'],
        },
        hasPermission: {
          $id: '#/properties/location/properties/hasPermission',
          type: 'boolean',
          title: 'The hasPermission schema',
          default: false,
          examples: [false],
        },
        goToUser: {
          $id: '#/properties/location/properties/goToUser',
          type: 'boolean',
          title: 'The goToUser schema',
          default: false,
          examples: [false],
        },
        userVisible: {
          $id: '#/properties/location/properties/userVisible',
          type: ['boolean', 'null'],
          title: 'The userVisible schema',
          default: null,
          examples: [true, false, null],
        },
      },
      additionalProperties: true,
    },
    app: {
      $id: '#/properties/app',
      default: {},
      description: 'Schema for general app state.',
      examples: [
        {
          active: true,
          storageLoaded: false,
          settings: {
            notifications: false,
            backgroundGeo: false,
          },
        },
      ],
      required: ['active', 'storageLoaded', 'settings', 'onboarding'],
      title: 'The app schema',
      type: 'object',
      properties: {
        active: {
          $id: '#/properties/app/properties/active',
          type: 'boolean',
          title: 'The active schema',
          default: false,
          examples: [true],
        },
        storageLoaded: {
          $id: '#/properties/app/properties/storageLoaded',
          type: 'boolean',
          title: 'The storageLoaded schema',
          default: false,
          examples: [false],
        },
        settings: {
          $id: '#/properties/app/properties/settings',
          default: {},
          examples: [
            {
              notifications: false,
              backgroundGeo: false,
            },
          ],
          required: ['notifications', 'backgroundGeo'],
          title: 'The settings schema',
          type: 'object',
          properties: {
            notifications: {
              $id: '#/properties/app/properties/settings/properties/notifications',
              default: false,
              examples: [true, false],
              title: 'The settings/notifications schema',
              type: 'boolean',
            },
            backgroundGeo: {
              $id: '#/properties/app/properties/settings/properties/backgroundGeo',
              default: false,
              examples: [true, false],
              title: 'The settings/backgroundGeo schema',
              type: 'boolean',
            },
          },
          additionalProperties: true,
        },
        onboarding: {
          $id: '#/properties/app/properties/onboarding',
          default: {},
          examples: [
            {
              shouts: 'active',
              shoutTimestamp: null,
            },
          ],
          required: ['shouts', 'shoutTimestamp'],
          title: 'The onboarding schema',
          type: 'object',
          properties: {
            shouts: {
              $id: '#/properties/app/properties/onboarding/properties/shouts',
              default: 'active',
              examples: ['active', 'visible', 'expired'],
              title: 'The onboarding/shouts schema',
              type: 'string',
            },
            shoutTimestamp: {
              $id: '#/properties/app/properties/onboarding/properties/shoutTimestamp',
              default: null,
              examples: [null, 604800000],
              title: 'The onboarding/shoutTimestamp schema',
              type: ['null', 'number'],
            },
          },
          additionalProperties: true,
        },
      },
      additionalProperties: true,
    },
    shouts: {
      $id: '#/properties/shouts',
      default: {},
      description: 'Schema for local shouts created/edited by the user.',
      examples: [
        {
          local: [],
          loading: true,
        },
      ],
      required: ['local', 'loading'],
      title: 'The shouts schema',
      type: 'object',
      properties: {
        local: {
          $id: '#/properties/shouts/properties/local',
          type: 'array',
          title: 'The local schema',
          default: false,
          examples: [{ id: 123, text: 'LOUD NOISES!' }],
        },
        loading: {
          $id: '#/properties/shouts/properties/loading',
          type: 'boolean',
          title: 'The loading schema',
          default: true,
          examples: [true],
        },
      },
      additionalProperties: true,
    },
  },
  additionalProperties: true,
};
