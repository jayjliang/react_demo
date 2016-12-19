const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: "./dev/js/index.jsx",
  output: {
    path: path.join(__dirname, "/out/js"),
    filename: "bundle.js",
    publicPath: "/out/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    inline: true,
    colors: true,
    progress: true,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
}