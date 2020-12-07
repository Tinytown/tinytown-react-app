export default {
  $id: 'http://example.com/example.json',
  $schema: 'http://json-schema.org/draft-07/schema',
  default: {},
  description: 'JSON Schema for Redux state validator.',
  examples: [
    {
      auth: {
        isSignedIn: false,
        user: {
          photoURL: 'url',
          displayName: 'name',
          uid: 'id',
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
        active: false,
        loaded: {
          map: false,
        },
      },
    },
  ],
  required: ['auth', 'location', 'app'],
  title: 'State Schema',
  type: 'object',
  properties: {
    auth: {
      $id: '#/properties/auth',
      default: {},
      description: "Schema for user's authentication state.",
      examples: [
        {
          isSignedIn: false,
          user: {
            photoURL: 'url',
            displayName: 'name',
            uid: 'id',
          },
        },
      ],
      required: ['isSignedIn', 'user'],
      title: 'Auth State',
      type: 'object',
      properties: {
        isSignedIn: {
          $id: '#/properties/auth/properties/isSignedIn',
          default: false,
          examples: [false],
          type: 'boolean',
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
          type: 'object',
          properties: {
            photoURL: {
              $id: '#/properties/auth/properties/user/properties/photoURL',
              default: '',
              examples: [
                'https://pbs.twimg.com/profile_images/1278735735588139009/4-DSoEkh_normal.jpg',
              ],
              type: 'string',
            },
            displayName: {
              $id: '#/properties/auth/properties/user/properties/displayName',
              default: '',
              examples: ['Tinytown_Dev'],
              type: 'string',
            },
            uid: {
              $id: '#/properties/auth/properties/user/properties/uid',
              default: '',
              examples: ['2LgMdnS879UYXTEvjDjufu4e37b2'],
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
      description: "Schema for user's location state.",
      examples: [
        {
          user: null,
          hasPermission: false,
          watchingLocation: false,
          goToUser: false,
          userVisible: false,
        },
      ],
      required: [
        'user',
        'hasPermission',
        'watchingLocation',
        'goToUser',
        'userVisible',
      ],
      title: 'Location State',
      type: 'object',
      properties: {
        user: {
          $id: '#/properties/location/properties/user',
          default: null,
          examples: [-93.26392, 44.98459],
          type: ['null', 'array'],
        },
        hasPermission: {
          $id: '#/properties/location/properties/hasPermission',
          default: false,
          examples: [false],
          type: 'boolean',
        },
        watchingLocation: {
          $id: '#/properties/location/properties/watchingLocation',
          default: false,
          examples: [false],
          type: 'boolean',
        },
        goToUser: {
          $id: '#/properties/location/properties/goToUser',
          default: false,
          examples: [false],
          type: 'boolean',
        },
        userVisible: {
          $id: '#/properties/location/properties/userVisible',
          default: false,
          examples: [false],
          type: 'boolean',
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
          active: false,
          loaded: {
            map: false,
          },
        },
      ],
      required: ['active', 'loaded'],
      title: 'App State',
      type: 'object',
      properties: {
        active: {
          $id: '#/properties/app/properties/active',
          default: false,
          examples: [false],
          type: 'boolean',
        },
        loaded: {
          $id: '#/properties/app/properties/loaded',
          default: {},
          examples: [
            {
              map: false,
            },
          ],
          required: ['map'],
          type: 'object',
          properties: {
            map: {
              $id: '#/properties/app/properties/loaded/properties/map',
              default: false,
              examples: [false],
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
