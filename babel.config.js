module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['transform-inline-environment-variables'],
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.android.js',
          '.ios.js',
        ],
        alias: {
          'res': './src/res',
          'screens': './src/screens',
          'library': './src/library',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
