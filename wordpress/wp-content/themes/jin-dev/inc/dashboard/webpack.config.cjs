const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    'jins-dev-general-settings': path.resolve(__dirname, 'src/jins-dev-general-settings.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dashboard'),
    filename: '[name].js',
  },
};