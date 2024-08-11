const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const STATIC_DIR = path.resolve(__dirname, '..', 'static');

module.exports.STATIC_DIR = STATIC_DIR;

module.exports = {
  entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
  },
  performance: {
    // maxAssetSize: 100000,
    // hints: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Test title',
      template: path.resolve(PUBLIC_DIR, 'index.html'),
      filename: "index.html",
      favicon: path.resolve(PUBLIC_DIR, 'favicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY),
    })
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/, // Match `.js`, `.jsx`, `.ts` or `.tsx` files
        exclude: /node_modules/,
        loader: 'swc-loader',
        options: {
          module: { type: 'es6' },
          minify: true,
          isModule: true,
          jsc: {
            minify: { compress: true, mangle: true, format: { asciiOnly: true, comments: /^ webpack/ } },
            target: 'esnext',
            parser: { syntax: 'typescript', tsx: true },
            transform: { react: { runtime: 'automatic', refresh: true } },
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: path.join('assets', 'images', '[name].[hash][ext]'),
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: path.join('assets', 'fonts', '[name].[hash][ext]'),
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    }
  }
}