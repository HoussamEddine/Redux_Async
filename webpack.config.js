const webpack = require("webpack");
const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    main: "./src/index.js"
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanPlugin("dist"),
    new HtmlPlugin({
      template: "./index.html",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "runtime"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  }
};

module.exports = config;