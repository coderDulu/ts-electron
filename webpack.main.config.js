const path = require('path');

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
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-typescript'
          ],
          // 开启缓存
          cacheDirectory: true,
          // 关闭压缩
          cacheCompression: false,
        }
      },
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
}