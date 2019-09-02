const path = require('path');
const autoprefixer = require('autoprefixer');
const flexfixes = require('postcss-flexbugs-fixes');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: ['@babel/polyfill', 'whatwg-fetch', './src/index.jsx'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    historyApiFallback: true // enables reloads of routed pages
  },

  devtool: process.env.npm_lifecycle_event === 'build' ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',

  module: {
    rules: [
      {
        enforce: 'pre', // lint files before they are transformed, config in .eslintrc.json
        test: /\.(js|tsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader' // config in .babelrc
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({browsers: ['last 2 versions']}),
                  flexfixes()
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'src')]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000' // will insert a data URI if filesize < 10kb otherwise uses file-loader
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true
    }),
    new ExtractTextPlugin('bundle.css')
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.json', '.scss', '.svg'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
};

module.exports = config;
