const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'cheap-module-source-map',
})
