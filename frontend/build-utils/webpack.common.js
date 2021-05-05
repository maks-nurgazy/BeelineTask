const commonPaths = require('./common-paths');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  output: {
    path: commonPaths.outputPath,
    publicPath: '/',
  },
  target: 'web',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]semantic-ui-([\S]+)[\\/]/,
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      favicon: `public/favicon.ico`,
    }),
  ],
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "http://127.0.0.1:8000",
    }),
  },
};

module.exports = config;
