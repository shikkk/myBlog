# Vue性能优化

## 一、 Vue代码层优化

1. v-if和v-show的区分使用场景
   * v-if适用于在运行时很少改变条件不需要频繁切换条件的场景；
   * v-show适用于需要频繁切换条件的场景

2. computed和watch的合理使用
   * computed是计算属性，依赖其他属性值，并且它的值有缓存，只有它依赖的属性值改变，下一次获取它的值才会重新计算computed的值
      + 当我们需要数值计算，并依赖其他数据时，应该使用它，因为可以利用computed的缓存特性。避免每次获取值时重新计算
   * watch是观察、监听的作用，每当监听的数据变化都会执行监听回调操作
      + 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用它。它可以允许我们执行异步操作。
3. v-for遍历必须为item设置key，并且避免同时使用v-if
4. 长列表性能优化
   * 有些页面是纯粹的数据展示，不会有任何变化，我们就不需要vue来数据劫持，在大量数据展示的情况下，这能很明显的减少组件初始化的时间。可以用**Object.freeze**方法冻结一个对象，一旦被冻结就不会被修改。
   * ```javascript
       export default {
        data: () => ({
          users: {}
        }),
        async created() {
          const users = await axios.get("/api/users");
          this.users = Object.freeze(users);
        }
      };
    
5. 图片资源懒加载
   * npm install vue-lazyload --save-dev

6. 事件销毁
   * 如果项目内使用了addEventListener做事件监听，那必须在销毁的钩子里做事件销毁removeEventListener
7. 路由懒加载
    ```javascript
    const Foo = () => import('./Foo.vue')
    const router = new VueRouter({
      routes: [
        { path: '/foo', component: Foo }
      ]
    })
8. 第三方插件的按需引入
   * 需要的组件引入项目，不需要的不引入。使用 babel-plugin-component插件
9. 优化无限列表性能
   * 使用vue-virtual-scroll-list 和 vue-virtual-scroller
10. 服务端渲染ssr和预渲染
   * 优点：
      1. 利于SEO，因SPA页面内容是通过Ajax获取的，而搜索引擎不会等待Ajax异步完成后再捕获页面内容，所以SPA页面抓不到页面Ajax获取的内容；而ssr会直接把页面返回给浏览器，搜索引擎会直接拿到页面的内容
      2. 更快的加载页面。SPA会等待vue编译后的js文件都下载完成才渲染页面，这些都需要时间；SSR直接由服务端渲染好页面反给浏览器，无需等待js文件。所以SSR加载页面更快
  * 缺点：
     1. 更多的开发条件限制：服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境
     2. 更多的服务器负载：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用CPU 资源，因此如果你预料在高流量环境下使用，请准备相应的服务器负载，并明智地采用缓存策略。

    1. 预渲染： prerender-spa-plugin 
11. polyfill (兼容低版本浏览器拆件)
  * 包很大，不建议直接项目中下载，建议直接引入js
  * <https://polyfill.io/v3/url-builder/>
  * https://polyfill.io/v3/polyfill.min.js(引入js)

12. 页面性能检测工具
  * <https://developers.google.com/speed/pagespeed/insights/>

## 二、 Webpack层面的优化

1. Webpack 对图片进行压缩
   *  webpack.base.conf.js 中 url-loader 中设置 limit 大小来对图片处理，对小于 limit 的图片转化为 base64 格式
   * image-webpack-loader来压缩图片  
     npm install image-webpack-loader --save-dev
2. 减少ES6转ES5的多余重复的代码
   * babel-plugin-transform-runtime
3. 提取公共代码
   * 如果项目中没有去将每个页面的第三方库和公共模块提取出来，则项目会存在以下问题：
      1. 相同的资源被重复加载，浪费用户的流量和服务器的成本
      2. 每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验。
   * Webpack 内置了专门用于提取多个Chunk 中的公共部分的插件 CommonsChunkPlugin
   ```javascript
   // 所有在 package.json 里面依赖的包，都会被打包进 vendor.js 这个文件中。
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      }
    }),
    // 抽取出代码模块的映射关系
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
4. 模板预编译  
   * vue-template-loader  
 
5. 提取组件的CSS
6. 优化 SourceMap
   * sourceMap ，它就是为了解决不好调式代码问题的
   * 开发环境推荐：cheap-module-eval-source-map  
     生产环境推荐：cheap-module-source-map
7. 构建结果输出分析
   * Webpack 输出的代码可读性非常差而且文件非常大，让我们非常头疼。为了更简单、直观地分析输出结果，社区中出现了许多可视化分析工具。这些工具以图形的方式将结果更直观地展示出来，让我们快速了解问题所在
   * 分析工具webpack-bundle-analyzer
   ```javascript
   // 我们在项目中 webpack.prod.conf.js 进行配置：
    if (config.build.bundleAnalyzerReport) {
      var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
      webpackConfig.plugins.push(new BundleAnalyzerPlugin());
    }
    // 执行 $ npm run build \--report 后生成分析报告
## 三、 基础的web技术优化
1. 开启 gzip 压缩
   * gzip 是 GNUzip 的缩写，最早用于 UNIX 系统的文件压缩。HTTP 协议上的 gzip 编码是一种用来改进 web 应用程序性能的技术，web 服务器和客户端（浏览器）必须共同支持 gzip。目前主流的浏览器，Chrome，firefox，IE等都支持该协议。常见的服务器如 Apache，Nginx，IIS 同样支持，gzip 压缩效率非常高，通常可以达到 70% 的压缩率，也就是说，如果你的网页有 30K，压缩之后就变成了 9K 左右
   ```javascript
   // 以服务端使用我们熟悉的 express 为例，开启 gzip 非常简单
   // 安装
   // npm install compression --save
   // 逻辑代码
   var compression = require('compression');
   var app = express();
   app.use(compression())
2. 开启http缓存
3. CDN 的使用


