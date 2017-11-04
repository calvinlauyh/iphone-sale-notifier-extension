'use strict';
const webpack = require('webpack');
const path = require('path');

const NODE_ENV = (typeof process.env.NODE_ENV === 'undefined')
  ? 'production'
  : process.env.NODE_ENV;

let plugins = [new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(NODE_ENV)
  }
})];
if (NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: {
    popup: path.resolve(__dirname, 'src/js/popup/index.js'),
    background: path.resolve(__dirname, 'src/js/background/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: '[name].bundle.js',
  },

  module: {
    loaders: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.css/,
      loader: ['style-loader', 'css-loader'],
    },
    {
      test: /\.json/,
      loader: 'json-loader',
    }]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src/js'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: ['.jsx','.js']
  },
  plugins,

  devtool: (NODE_ENV === 'production' || NODE_ENV === 'devbuild')? 'source-map': 'eval-source-map',
  devServer: {
    port: 8080,
    contentBase: __dirname,
    publicPath: '/js/'
  }
};
