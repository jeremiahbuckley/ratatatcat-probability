const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader' // Adds CSS to the DOM by injecting a <style> tag
          },
          {
            loader: 'css-loader' //  interprets @import and url() like import/require() and will resolve them.
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          },
          {
            loader: 'postcss-loader', // postcss loader so we can use autoprefixer
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'ng-annotate-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.html$/,
        loaders: [
          'html-loader'
        ]
     },
      {
        test: /\.(eot|woff|woff2|ttf|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader?limit=100000@name=[name][ext]'
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'url-loader?mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html'),
      chunksSortMode: 'dependency'
    }),
    new webpack.ProvidePlugin({   
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    })
  ],
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'index.js'
  },
  entry: `./${conf.path.src('index')}`
};
