const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const { minifierConfig } = defaultConfig.transformer;

// Pendo's codeless analytics identifies components by name, so release bundles must keep
// class and function names. Metro's default minifier settings are preserved alongside them.
const config = {
  transformer: {
    minifierConfig: {
      ...minifierConfig,
      keep_classnames: true,
      keep_fnames: true,
      mangle: {
        ...minifierConfig.mangle,
        keep_classnames: true,
        keep_fnames: true,
      },
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
