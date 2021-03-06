'use strict';

const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = function generate(options) {
  return {
    mode: options.mode,
    entry: path.resolve(__dirname, '../main'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: options.mode === 'production' ? 'main-[chunkhash].js' : 'main.js'
    },
    resolve: {
      modules: [path.resolve(__dirname, '..'), path.resolve(__dirname, '../node_modules')]
    },
    stats: {
      maxModules: Infinity,
      optimizationBailout: true
    },
    plugins: [
      new webpack.DefinePlugin({
        RANDOM: options.random
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new LiveReloadPlugin({
        quiet: true
      })
    ]
  };
};
