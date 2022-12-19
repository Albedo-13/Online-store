const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// читай readme.txt в корне папки src, настрой scss транслятор

// TODO: настроить импорты-экспорты файлов из папки модулей

// TODO: настроить ts to js транслятор
// https://github.com/Jeneko/News-api-migration-walkthrough/blob/main/README.md

// index.js сам вызывается в html без подключения

const baseConfig = {
  entry: {
    main: path.resolve(__dirname, './src/pages/main/js/index'),
    cart: path.resolve(__dirname, './src/pages/cart/js/index'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    filename: 'pages/[name]/js/index.js',
    path: path.resolve(__dirname, `./dist/`),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/main/index.html'),
      filename: './pages/main/index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/cart/index.html'),
      filename: './pages/cart/index.html',
    }),
    new CleanWebpackPlugin(),
    new EslingPlugin({
      extensions: 'ts'
    }),
    new MiniCssExtractPlugin({
      filename: "./pages/[name]/css/styles.css",
    }),
    // Очень тяжелый плагин, альтернативы?
    // Переписать CopyPlugin на MiniCssExtractPlugin
    new CopyPlugin({
      patterns: [
        { from: "./src/assets/", to: "./assets/" },
      ],
    }),
  ],
};

module.exports = ({
  mode
}) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};