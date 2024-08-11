const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: common.STATIC_DIR,
    hot: true,
    port: 9000,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new ReactRefreshPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
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