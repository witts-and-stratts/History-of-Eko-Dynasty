const path = require("path");
const webpack = require("webpack");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
    app: __dirname + "/src/ts/app.ts",
    // livestream: __dirname + "/src/ts/livestream.ts"
  },
  // devtool: "inline-source-map",
  watch: true,
  output: {
    path: __dirname + "/dist/assets/js",
    filename: "[name].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.IgnorePlugin({resourceRegExp: /^dashboard$/, contextRegExp: /\.\//}),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /backend/],
        use: {
          // loader: "babel-loader",
          loader: "ts-loader",
        },
      },
    ],
  },
};
