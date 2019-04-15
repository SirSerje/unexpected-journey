const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const port = process.env.FRONT;
const backPort = process.env.BACK;
module.exports = merge(webpackConfig, {

  devtool: 'eval',

  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    host: 'localhost',
    port: port,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    proxy: {
      '/':`http://localhost:${backPort}`
    }
  }
});
