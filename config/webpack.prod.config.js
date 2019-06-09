const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: './src/components/react-curve.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  optimization: {
    minimizer: [
        new UglifyJsPlugin({
            uglifyOptions: {
                ie8: true,
                mangle: true
            },
            exclude: /node_modules/
        })
    ],
  },
  externals: [nodeExternals({
    whitelist: ['core-js/features/array/map']
  })]
};