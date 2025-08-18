const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',          // starting JS file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true                     // clean old files before build
  },
  mode: 'development',              // default to dev mode
  devServer: {
    static: './dist',
    open: true,                      // auto open browser
    hot: true                        // enable hot reloading
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // allow CSS imports
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // base HTML file
      title: 'My Todo App'
    }),
  ],
};