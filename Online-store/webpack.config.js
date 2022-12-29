const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// читай readme.txt в корне папки src, настрой scss транслятор

// index.js сам вызывается в html без подключения (хз почему :) )

const baseConfig = {
  entry: {
    main: path.resolve(__dirname, './src/pages/main/js/script'),
    cart: path.resolve(__dirname, './src/pages/cart/js/script'),
    about: path.resolve(__dirname, './src/pages/about/js/script'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'pages/[name]/js/script.js',
    path: path.resolve(__dirname, `./dist/`),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/main/index.html'),
      filename: './pages/main/index.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/cart/index.html'),
      filename: './pages/cart/index.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/about/index.html'),
      filename: './pages/about/index.html',
      inject: false,
    }),
    new CleanWebpackPlugin(),
    new EslingPlugin({
      extensions: 'ts',
    }),
    // new MiniCssExtractPlugin({
    //   filename: './pages/[name]/css/styles.css',
    // }),
    // Очень тяжелый плагин, альтернативы?
    // Переписать CopyPlugin на MiniCssExtractPlugin
    new CopyPlugin({
      patterns: [
        { from: './src/assets/', to: './assets/' },
        { from: './src/pages/main/css/styles.css', to: './pages/main/css/' },
        { from: './src/pages/cart/css/styles.css', to: './pages/cart/css/' },
        { from: './src/pages/about/css/styles.css', to: './pages/about/css/' },
      ],
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};