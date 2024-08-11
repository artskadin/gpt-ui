const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: 'css/[name].[contenthash].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                mode: "local",
                auto: true, // https://github.com/webpack-contrib/css-loader#auto
                exportGlobals: true,
                localIdentName: "[local]__[hash:base64:5]",
              },
            }
          }
        ],
      }
    ]
  }
})