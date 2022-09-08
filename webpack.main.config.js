const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === 'production'
// 处理css的loader
/* const handleCssLoaders = (loader) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader", {
      // 配合package.json中的browserslist 
      // 处理兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugin: ['postcss-preset-env']  // 解决大多数样式兼容性问题
        }
      }
    },
    loader
  ].filter(Boolean)
} */

module.exports = {
  target: 'electron-main',
  mode: 'development',
  devtool: 'source-map',
  entry: './main.ts',
  output: {
    filename: './main.js',
    path: path.resolve(__dirname, './'),
    // clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.css$/,
      //   use: handleCssLoaders()
      // },
      // {
      //   test: /\.less$/,
      //   use: handleCssLoaders('less-loader')
      // },
      // {
      //   test: /\.s[ac]ss$/,
      //   use: handleCssLoaders('sass-loader')
      // },
      // 处理图片
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        type: "asset",
        parser: {
          // 将图片资源转为base64
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      },
      // 处理其他资源
      {
        test: /\.(woff2?|ttf)$/,
        type: "asset/resource"
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [
    nodeExternals()
  ],
}