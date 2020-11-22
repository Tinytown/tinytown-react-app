module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
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
  ],
};
