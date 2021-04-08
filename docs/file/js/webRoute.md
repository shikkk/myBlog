# 前端路由

#### 网页url组成部分
```javascript
// http://127.0.0.1:5500/question/vue/router.html?id=1&key=2#name
window.location
{
   hash: "#name", // hash值
   host: "127.0.0.1:5500", // ip地址带端口
   hostname: "127.0.0.1", // 域名 
   href: "http://127.0.0.1:5500/question/vue/router.html?id=1&key=2#name",
   origin: "http://127.0.0.1:5500",
   pathname: "/question/vue/router.html",  // path路径
   port: "5500",   // 端口
   protocol: "http:" ,    // http协议
   search: "?id=1&key=2"  // 参数
}
```

## hash
### onhashchange
* 特点：
    * hash变化会触发页面跳转，浏览器前进后退
    * hash变化 `不会刷新页面`，SPA必须特点
    * hash不会提交到server端（前端控制）
* window.onload和DOMContentLoaded区别
   + window.onload资源全部加载完才能执行，包括图片
   + DOMContentLoaded DOM渲染完成即可，图片可能尚未下载
* 监听页面hash变化
```javascript
window.onhashchange = (e) => {
    console.log('old url', e.oldURL)  // 旧的url
    console.log('new url', e.newURL)  // 新的url
    console.log('hash', location.hash)  // hash值
}
window.addEventListener('hashchange', (e)=> {
    console.log('old url', e.oldURL)  // 旧的url
    console.log('new url', e.newURL)  // 新的url
})
// 页面初始监听hash
window.addEventListener('DOMContentLoaded', ()=> {
  console.log('DOMContentLoaded', location.hash)
})
```

## history
用url规范路由，跳转同样`不刷新页面`，需后端协作
### 1. HTML4 history API
```javascript
window.history.forward() // 前进到下一页
window.history.back()  // 后退上一页
window.history.go(2)   // 前进2页
window.history.go(-2)   // 后退2页
```

### 2. HTML5新增pushState、replaceState
可对浏览历史新增和修改，页面不会变化，只是url变化
### History.pushState()
向当前浏览器会话的历史堆栈中添加一个状态（state）
```javascript
// 原url http://127.0.0.1:5500/question/vue/router.html
const state = { name: 'page1',}  // 状态：popstate事件返回的state
const title = ''
const url = 'page1'  // path路径
history.pushState(state, title, url)
// pushState后：http://127.0.0.1:5500/question/vue/page1
```
### History.replaceState()

`history.replaceState()` 的使用与 `history.pushState()` 非常相似，区别在于  replaceState()  是修改了当前的历史记录项而不是新建一个
```javascript
const state = { name: 'page1',}  // 状态：每当状态有变化是，都会触发 `popstate` 事件
const title = ''
const url = 'page2'  // path路径
history.pushState(state, title, url)   // 只是修改路径名称
```
### window.onpopstate
监听浏览器前进后退
```javascript
window.addEventListener('popstate', (e)=> {
    console.log('state', e.state)  // 为pushState()中的第一个参数对象，初始为null
})
```
#### forward、back、go会触发popstate，但pushState、replaceState不会

### 后端配置
如果 URL 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面，这个页面就是 `app` 依赖的页面

1. nginx
```javascript
location / {
  try_files $uri $uri/ /index.html;
}
```
2. 原生node.js
```javascript
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.html" file.')
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```
#### [参考-Vue Router后端配置](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)
