const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map", // see the original code on the browser
  entry: "./src/index",
  output: {
    // where webpack wiil output the files
    path: path.resolve(__dirname, "build"), // dirname is current directory
    publicPath: "/", // the publick url in the browser
    filename: "bundle.js", // the name of the file in dev mode the isn't a physical file it serves from the memory
  },
  stats: "minimal",
  devServer: {
    client: {
      overlay: true, // show errors
    },
    historyApiFallback: true, // all request will be sent to index.html helps the router
    allowedHosts: "all",
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),
    
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    rules: [
      // declare which files to handle
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // dont process node module
        use: ["babel-loader", "eslint-loader"], // webpack will run eslint and then babel
      },
      {
        test: /(\.css)$/, // process css
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
