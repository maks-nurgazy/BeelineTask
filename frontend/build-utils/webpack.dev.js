const commonPaths = require('./common-paths');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const port = process.env.PORT || 3000;

const config = {
  mode: 'development',
  entry: {
    app: [`${commonPaths.appEntry}/index.js`, 'webpack-plugin-serve/client'],
  },
  output: {
    filename: '[name].[fullhash].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [require('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: { sockIntegration: 'wps' },
    }),
    new Serve({
      historyFallback: true,
      liveReload: false,
      hmr: true,
      host: '127.0.0.1',
      port: port,
      open: true,
      static: commonPaths.outputPath,
    }),
  ],
  watch: true,
};

module.exports = config;
