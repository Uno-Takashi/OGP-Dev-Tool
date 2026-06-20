const common = require('./rspack.common.js');

module.exports = {
  ...common,
  devtool: 'inline-source-map',
  mode: 'development',
};
