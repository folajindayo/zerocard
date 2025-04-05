// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

// Add asset file extensions
config.resolver.assetExts.push(
  'glb', 'gltf', 'png', 'jpg', 'jpeg', 'ttf'
);
config.resolver.sourceExts.push('js', 'json', 'ts', 'tsx', 'cjs');

module.exports = withNativeWind(config, { input: "./global.css" });
