const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Preserve class and function names in production bundles so Pendo's
// codeless solution can identify components.
const config = {
  transformer: {
    ...defaultConfig.transformer,
    minifierConfig: {
      keep_classnames: true,
      keep_fnames: true,
      mangle: {
        keep_classnames: true,
        keep_fnames: true,
      },
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
