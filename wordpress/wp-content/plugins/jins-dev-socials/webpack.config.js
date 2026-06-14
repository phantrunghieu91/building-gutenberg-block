const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry, // ← keep existing block entries
    'jins-dev-socials-general-settings': path.resolve(__dirname, 'src/jins-dev-socials-general-settings.js'),
  },
};