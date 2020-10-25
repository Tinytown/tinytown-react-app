module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'comma-dangle': ["error", "always-multiline"],
    'arrow-parens': ["error", "always"],
    'no-confusing-arrow': "error",
    'prefer-arrow-callback': "error",
    'arrow-spacing': "error",
    'camelcase': ["error", "always"],
    'no-unneeded-ternary': "error",
    'no-useless-constructor': "error",
    'object-shorthand': "error",
    'no-useless-rename': "error",
    'prefer-destructuring': ["error", {
      "array": true,
      "object": true,
    }, {
      "enforceForRenamedProperties": false,
    }],
    'no-underscore-dangle': [
      "off"],
  },
};
