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
          cameraTarget: null,
          hasPermission: null,
          goToUser: false,
          userVisible: true,
        },
      ],
      required: [
        'user',
        'cameraTarget',
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
          examples: [null, [-93.26392, 44.98459]],
          title: 'The user schema',
          type: ['null', 'array'],
        },
        cameraTarget: {
          $id: '#/properties/location/properties/cameraTarget',
          default: null,
          examples: [-93.26392, 44.98459],
          title: 'The cameraTarget schema',
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
          state: true,
          storageLoaded: false,
        },
      ],
      required: ['state', 'storageLoaded'],
      title: 'The app schema',
      type: 'object',
      properties: {
        state: {
          $id: '#/properties/app/properties/state',
          type: ['null', 'string'],
          title: 'The app state schema',
          default: 'inactive',
          examples: ['active', 'inactive', 'background'],
        },
        storageLoaded: {
          $id: '#/properties/app/properties/storageLoaded',
          type: 'boolean',
          title: 'The storageLoaded schema',
          default: false,
          examples: [false],
        },
      },
      additionalProperties: true,
    },
    shouts: {
      $id: '#/properties/shouts',
      default: {},
      description: 'Schema for shouts settings and data.',
      examples: [
        {
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
      ],
      required: ['local', 'opened', 'notifications', 'settings'],
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
        opened: {
          $id: '#/properties/shouts/properties/opened',
          type: 'array',
          title: 'The opened schema',
          default: [],
          examples: [{ id: 123 }],
        },
        notifications: {
          $id: '#/properties/shouts/properties/notifications',
          type: 'array',
          title: 'The shouts/notifications schema',
          default: [],
          examples: [{ id: 123 }],
        },
        settings: {
          $id: '#/properties/shouts/properties/settings',
          default: {},
          examples: [
            {
              twitter: false,
              twitterGeo: {
                enabled: false,
                loading: false,
              },
              lann: false,
            },
          ],
          required: ['twitter', 'twitterGeo', 'lann'],
          title: 'The shouts/settings schema',
          type: 'object',
          properties: {
            twitter: {
              $id: '#/properties/shouts/properties/settings/properties/twitter',
              default: false,
              examples: [true, false],
              title: 'The shouts/twitter schema',
              type: 'boolean',
            },
            twitterGeo: {
              $id: '#/properties/shouts/properties/settings/properties/twitterGeo',
              default: {},
              examples: [
                {
                  enabled: false,
                  loading: false,
                },
              ],
              required: ['enabled', 'loading'],
              title: 'The shouts/twitterGeo schema',
              type: 'object',
              properties: {
                enabled: {
                  $id: '#/properties/shouts/properties/settings/properties/twitterGeo/properties/enabled',
                  default: false,
                  examples: [true, false],
                  title: 'The twitterGeo/enabled schema',
                  type: 'boolean',
                },
                loading: {
                  $id: '#/properties/shouts/properties/settings/properties/twitterGeo/properties/loading',
                  default: false,
                  examples: [true, false],
                  title: 'The twitterGeo/loading schema',
                  type: 'boolean',
                },
              },
              additionalProperties: true,
            },
            lann: {
              $id: '#/properties/shouts/properties/settings/properties/lann',
              default: false,
              examples: [true, false],
              title: 'The shouts/lann schema',
              type: 'boolean',
            },
          },
          additionalProperties: true,
        },
      },
      additionalProperties: true,
    },
  },
  additionalProperties: true,
};
