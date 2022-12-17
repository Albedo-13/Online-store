const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // optional?

// читай readme.txt в корне папки src, настрой scss транслятор

// TODO: при компиляции dist папки через npm run build 
// должна сохраняться многостраничная структура папок

// TODO: настроить ts to js транслятор
// https://github.com/Jeneko/News-api-migration-walkthrough/blob/main/README.md

// TODO: подтягивать папку ассетов
// https://github.com/webpack-contrib/css-loader#recommend

// TODO: Разобраться почему в консоли два раза
// вызывается /main/index.js

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
    filename: '[name]/js/index.js',
    path: path.resolve(__dirname, `./dist/`),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/main/index.html'),
      filename: './main/index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/cart/index.html'),
      filename: './cart/index.html',
    }),
    new CleanWebpackPlugin(),
    new EslingPlugin({
      extensions: 'ts'
    }),
    new MiniCssExtractPlugin({
      filename: "./[name]/css/styles.css",
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