module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'ignorePatterns': ['ic_*'],
  'rules': {
    // Commas, Quotes & Semicolons
    'comma-dangle': ['error', 'always-multiline'],
    'quotes': ['error', 'single'],
    'semi': [2, 'always'],

    // Arrow Functions
    'arrow-parens': ['error', 'always'],
    'no-confusing-arrow': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-spacing': 'error',

    // Naming
    'camelcase': ['error', { properties: 'always' }],
    'new-cap': ['error', { 'capIsNew': false }],

    // Whitespace
    'indent': ['error', 2],
    'space-before-blocks': 'error',
    'keyword-spacing': ['error', { 'before': true }],
    'space-infix-ops': 'error',
    'eol-last': ['error', 'always'],
    'no-whitespace-before-property': 'error',
    'newline-per-chained-call': 'error',
    'no-whitespace-before-property': 'error',
    'padded-blocks': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', { 'code': 120, 'tabWidth': 2, 'ignoreComments': true }],
    'block-spacing': 'error',
    'comma-spacing': 'error',
    'computed-property-spacing': 'error',
    'func-call-spacing': 'error',
    'key-spacing': 'error',
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1 }],

    // Misc
    'no-unneeded-ternary': 'error',
    'no-useless-constructor': 'error',
    'object-shorthand': 'error',
    'no-useless-rename': 'error',
    'prefer-destructuring': ['error', {
      'array': true,
      'object': true,
    }, {
      'enforceForRenamedProperties': false,
    }],

  },
};
