const package = require("./package.json");
const path = require("path");
const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    client: ['./src/index.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, '.'), 'node_modules'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: package.name,
      template: './index.html'
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        },
      },
    },
  },
  stats: {
    moduleTrace: true,
    errorDetails: true,
  },
};

module.exports = (env, argv) => {
  // Development
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.devServer = {
      publicPath: '/',
      historyApiFallback: true,
      host: '0.0.0.0',
      disableHostCheck: true,
    }
  }

  // Production
  if (argv.mode === 'production') {
    config.plugins = config.plugins.concat([
      new CleanWebpackPlugin(['./dist']),
    ]);
  }

  return config;
};
