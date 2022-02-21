const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin"); // removing as it is included by default
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { "hello-world": "./src/hello-world.js", kiwi: "./src/kiwi.js" },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/static/",
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 1000,
      automaticNameDelimiter: "_",
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["transform-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: {
          loader: "handlebars-loader",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Hello world!",
      filename: "hello-world.html",
      chunks: ["hello-world", "vendors~hello-world~kiwi"],
      template: "src/page-template.hbs",
      description: "Hello world!",
    }),
    new HtmlWebpackPlugin({
      title: "Kiwi",
      filename: "kiwi.html",
      chunks: ["kiwi", "vendors~hello-world~kiwi"],
      template: "src/page-template.hbs",
      description: "kiwi",
    }),
  ],
};
