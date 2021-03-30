# webpack

## 基本配置

```js
// webpack.config
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',  //开发模式 或production
  entry: path.join(__dirname, 'src', 'index.js'),  //入口文件
  output: {   // 出口文件
    filename: 'bundle.js',  //打包出文件名
    path: path.join(__dirname, 'dist') // 打包文件夹位置  没有会自动创建
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],  //转换es6代码
        include: path.join(__dirname, 'src'),  //包含某个目录走这个loader
        exclude: /node_modules/   //不包含node_modules
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),  //找到已有的模板文件
      filename: 'index.html'    //产出模板的名  会放在dist文件下
    })
  ],
  devServer: {  //启动本地服务
    port: 3000,
    contentBase: path.join(__dirname, 'dist')  //当前的目录
  }
}
```
