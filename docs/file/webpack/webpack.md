# webpack

## 基本配置
名称|描述
:--|:--|
bundle|是由webpack打包出来的文件
chunk|代码块，一个chunk由多个模块组合而成，用于代码的合并和分割
module|是开发中的单个模块，在webpack的世界，一切皆模块，一个模块对应一个文件，webpack会从配置的entry中递归开始找出所有依赖的模块


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

## 多入口

```js
// webpack.common.js
module.exports = {
    // 1. 入口文件配置2个，有俩入口才能输出俩页面
    entry: {
            index: path.join(srcPath, 'index.js'),
            other: path.join(srcPath, 'other.js')
    },
    output: {   // 2. 出口文件
        // name 即多入口时 entry 的 key:index, other
        // contentHash 能在文件不变的情况下命中缓存
         filename: '[name].[contentHash:8].js', 
         path: distPath,
    },
     // 3. 配置plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index']  // 只引用 index.js
        }),
        // 多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other']  // 只引用 other.js
        })
      ],
}
```
## splitChunks 拆包
在开发中，如果每个页面都引用了`lodash.js`的方法，那么每个页面打包的时候都会把lodash打包进去，这样每次修改组件，lodash
也会每次改变不会命中缓存，对页面加载会产生一定的影响。我们可以用splitChunks把第三方模块单独拆出来做引用。公共方法也拆出来
```js
// 生产环境 webpack.prod.js
optimization: {
    // 分割代码块
    splitChunks: {
        chunks: 'all',
        /**
         * initial 入口 chunk，对于异步导入的文件不处理
            async 异步 chunk，只对异步导入的文件处理
            all 全部 chunk
         */
        // 缓存分组
        cacheGroups: {
            // 第三方模块
            vendor: {
                name: 'vendor', // chunk 名称
                priority: 1, // 权限更高，优先抽离，重要！！！
                test: /node_modules/,
                minSize: 0,  // 大小限制
                minChunks: 1  // 最少复用过几次,只要组件引入一次  立马拆出来
            },
            // 公共的模块
            common: {
                name: 'common', // chunk 名称
                priority: 0, // 优先级
                minSize: 0,  // 公共模块的大小限制
                minChunks: 2  // 公共模块最少复用过几次
            }
        }
    }
}
````
## 构建流程
<div style="width: 80px">步骤</div>|描述
:--|:--|
初始化参数|从配置文件和shell语句中读取与合并参数，得出最终参数
开始编译|用初始化时得出的参数初始化`Compiler` 对象，加载所有配置插件`plugins`，执行对象的`run`方法
确定入口|根据配置中的`entry`找出所有的入口文件
编译模块|从入口文件出发，调用所有配置的`Loader`对模块进行翻译，再找出该模块依赖的模块，递归本步骤直到所有入口依赖文件都经过了本步骤处理
完成模块编译|在经过上一步使用`Loader`翻译完所有模块后，得到了每个模块被翻译后的最终内容和他们的依赖关系
输出资源|根据入口和模块之前的依赖关系，组装成一个个包含多个模块的`chunk`,再把每个`chunk`转换成一个单独的文件加到输出列表，这步是修改输出内容的最后机会
输出完成|在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

#### [细说 webpack 之流程篇](https://fed.taobao.org/blog/2016/09/10/webpack-flow/)