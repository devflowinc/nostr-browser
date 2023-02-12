module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'bn.js': 'react-native-bignumber',
          },
        },
      ],
    ],
  };
};
