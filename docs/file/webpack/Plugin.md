# 常见实用的plugin

### html-webpack-plugin

将一个页面模板打包到dist目录下
```
npm i html-webpack-plugin@3.2.0 -D
```
webpack.config.js
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',  // 以咱们本地的index.html文件为基础模板
            filename: "index.html",  // 输出到dist目录下的文件名称
        }),
    ]
}
```
### clean-webpack-plugin
每次打包dist目录删除
```
npm i clean-webpack-plugin -D
```
webpack.config.js
```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    plugins: [
        new CleanWebpackPlugin()
    ]
}
```
### mini-css-extract-plugin
CSS提取到单独的文件中,支持按需加载
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                   MiniCssExtractPlugin.loader,
                   "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[name].css"
        })
    ]
} 
```
### webpack.optimize.CommonsChunkPlugin（内置）
用于将页面里的公共代码提取出来，从而进行优化加载速度,webpack自有插件

### DefinePlugin（内置）
用于注入全局变量，一般用在环境变量上
## ProvidePlugin（内置）
用于定义全局变量，如100个页面都引入vue，每个页面都引入只会增加工作量，直接在webpackProvide挂载一个变量就行，不用再去一一引入
```js
const Webpack = require("webpack")
module.exports = {
    plugins: [
        new Webpack.ProvidePlugin({
            "Vue": ["vue", "default"] 
        })
    ]
}
```
### uglifyjs-webpack-plugin
用于压缩js文件，针对webpack4版本以上
```js
npm install uglifyjs-webpack-plugin -D
```
````js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
 optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                exclude: /node_modules/
            })
        ]
    }
}
````
### optimize-css-assets-webpack-plugin
用于压缩css样式
```
npm i optimize-css-assets-webpack-plugin -D
```
```js
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
module.exports = {
    plugins: [
        new OptimizeCssAssetsWebpackPlugin(),
    ]
}
```
### imagemin-webpack-plugin
压缩图片
```
npm i imagemin-webpack-plugin -D
```
```js
const ImageminPlugin =  require('imagemin-webpack-plugin').default
module.exports = {
    plugins: [
        new ImageminPlugin({
             test: /\.(jpe?g|png|gif|svg)$/i 
        })
    ]
}
```
### webpack-bundle-analyzer

可视化webpack输出文件的体积

```js
// 我们在项目中 webpack.prod.conf.js 进行配置：
 if (config.build.bundleAnalyzerReport) {
   let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
   webpackConfig.plugins.push(new BundleAnalyzerPlugin());
 }
 // 执行 $ npm run build \--report 后生成分析报告
```
