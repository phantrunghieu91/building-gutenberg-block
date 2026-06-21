const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = async ( env ) => {
  const entry = await defaultConfig.entry();

  return {
    ...defaultConfig,
    entry: {
      ...entry,
      'jins-dev-socials-general-settings': path.resolve( __dirname, 'src/jins-dev-socials-general-settings.js' ),
    },
  };
};