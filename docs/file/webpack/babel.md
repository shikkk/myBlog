# babel
babel是一个JS编译器，用来转换最新的JS语法，比如把ES6, ES7等语法转化成ES5语法，从而能够在大部分浏览器中运行

## 1.安装

```
npm install @babel/core @babel/preset-env babel-loader --save-dev
```

## 2.配置

* .babelrc
```js
{
  "presets": ["@babel/preset-env"],   // preset-env一堆转义es6代码插件的集合
  "plugins": []        // 如果preset-env不满足一些语法的转义，配置plugins
}
```
* webpack.config.js
```js
module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],  //转换es6代码
        include: path.join(__dirname, 'src'),  //包含某个目录走这个loader
        exclude: /node_modules/   //不包含node_modules
      }
    ]
  }
```
## 3.插件

### 3.1 babel-polyfill(补丁)
* 兼容低版本浏览器
* polyfill支持语法少
* core.js兼容低版本浏览器语法的集合
    * 不兼容generator语法需要单独引入regenerator

babel-polyfill 以上俩者不足的集合
* babel7.4之后弃用babel-polyfill推介直接使用core.js和regenerator

缺点：
* 污染全局环境

### 3.2 babel-runtime
解决全局污染
