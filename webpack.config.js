const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ["webpack-dev-server/client" ,'./src/app.js'],

  output: { path: __dirname, filename: 'app.js' },

  watch: true,

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ["transform-class-properties"]
        }
      }
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader'],
    extensions: ['', '.js']
  },

  devtool: "eval",

  devServer: {
    host: 'localhost',
    port: '8080'
  }
};
