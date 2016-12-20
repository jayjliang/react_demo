const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    main: "./dev/js/index.jsx",
    app: "./dev/js/app.jsx"
  },
  output: {
    path: path.join(__dirname, "/out/js"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/out/js/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  performance: {
    hints: false
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
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["common", "vendor"]
    })
  ]
}