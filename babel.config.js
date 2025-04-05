module.exports = function(api) {
  api.cache(true);

  const plugins = [
    // Required for expo-router
    'expo-router/babel',
    'react-native-reanimated/plugin',
  ];

  // Add this conditional logic
  if (process.env.NODE_ENV === 'production') {
    // Remove console logs in production
    plugins.push('transform-remove-console');
  }

  return {
    presets: ['babel-preset-expo'],
    plugins: plugins, // Use the updated plugins array
  };
};
