const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    removeAvailableModules: true,
    removeEmptyChunks: true,
    minimize: true
  }
})
