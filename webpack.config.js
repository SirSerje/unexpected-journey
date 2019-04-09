const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Is the current build a development build
const IS_DEV = (process.env.ENV === 'dev')

const dirNode = 'node_modules'
const dirApp = path.join(__dirname, 'src')
const dirAssets = path.join(__dirname, 'assets')
const pathToHTML = path.join(__dirname, 'src/client/static/index.html')
const appHtmlTitle = 'Webpack Boilerplate'

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    /*   vendor: [
            'lodash'
        ],*/
    bundle: path.join(dirApp, 'client')
  },

  resolve: {
    modules: [
      dirNode,
      dirApp,
      dirAssets
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV
    }),

    new HtmlWebpackPlugin({
      template: pathToHTML,
      title: appHtmlTitle
    })
    // new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true
        }
      },

      // STYLES
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV
            }
          }
        ]
      },

      // CSS / SASS
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV,
              includePaths: [dirAssets]
            }
          }
        ]
      },

      // IMAGES
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },

      //ENABLE SOURCE MAPS
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  }
};
