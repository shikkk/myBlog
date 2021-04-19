# websocket
websocket协议是基于TCP的一种新的网络协议，它实现了浏览器与服务器**全双工通信**--允许服务器主动发送信息给客户端  
websocket是一种持久协议，http是非持久协议

## 作用
网站实时推送的需求，如聊天，客服咨询
## 由来
早期没有websocket时，通过ajax轮询，由http请求，服务端无法给浏览器主动发送数据，因此需要浏览器定时的给服务器发送请求，服务器把最新的数据响应给浏览器，这种模式的缺点就是浪费性能和资源
## 基本使用
h5提供了浏览器端使用websocket的Api

### 创建websocket对象
```js
// 参数1: websocket的服务地址
// 参数2：protocol,可选的，指定连接的协议
// new WebSocket(url, [protocol])
let socket = new WebSocket('ws://echo.websocket.org')
```
### websocket事件
事件|处理程序|描述
:--|:--|:--|
open|socket.onopen|连接建立是触发
message|socket.onopen|客户端接收服务端数据时触发
error|socket.onerror|通信发生错误是触发
close|socket.onclose|连接关闭时触发

### websocket方法
方法|描述
:--|:--|
socket.send()|使用连接发送数据
socket.close()|关闭连接

### 简单实现
```html
<body>
    <input type="text"/>
    <button>发送</button>
    <div id="content" ></div>
</body>
<script>
    let input = document.querySelector('input')
    let btn = document.querySelector('button')
    let div = document.querySelector('div')
    // 1. 创建websocket
    // 第一个参数websocket的服务地址
    let socket = new WebSocket('ws://echo.websocket.org')

    // 2. 客户端和服务端连接时触发 open
    socket.addEventListener('open', (e)=>{
        div.innerHTML= '连接成功'
    })

    // 3. 主动给websocket服务发送消息
    btn.addEventListener('click', () => {
        let value = input.value
        socket.send(value)
    })
     // 4. 接收服务器返回的数据
     socket.addEventListener('message', (e)=>{
        console.log(e)
        div.innerHTML= e.data
    })
    // 5. 服务断开
    socket.addEventListener('close', (e)=>{
        div.innerHTML= '服务已断开'
    })
</script>
```
## node开发websocket服务
安装 [nodejs-websocket](https://www.npmjs.com/package/nodejs-websocket) 插件
```
yarn add nodejs-websocket
```
```javascript
// app.js
const ws = require("nodejs-websocket")
const PROT = 3000
/**
 * 1. 创建一个server
 * 2. 处理用户的请求
 * **/
// 每次只要有用户连接，函数就会被执行，会给当前连接用户创建一个connect对象
const server = ws.createServer( connect => {
    console.log('有用户连上来了')
    // 每当接收到用户发送的数据，这个text事件就会被触发
    connect.on("text", str =>  {
        console.log("Received "+str)
        // 给用户返回数据 也有send方法和sendText一样
        // 处理数据 把接收的数据小写转好为大写拼接！号返回给用户
        connect.sendText(str.toUpperCase()+"!!!")
    })
    // 只要有用户断开连接，就会触发close事件
    connect.on("close", (code, reason) => {
        console.log("连接断开了")
    })

    // 处理报错信息
    connect.on("error", () => {
        console.log('用户连接异常')
    })
})

server.listen(PROT, () => {
    console.log('连接成功')
})
```

### socket.io
[Socket.IO](https://socket.io/) 是一个库，基于 Node.js 的实时应用程序框架。
可以在浏览器和服务器之间实现实时，双向和基于事件的通信。它适用于每个平台、浏览器或设备，
同样注重可靠性和速度。它包括
* node.js 服务器
* 浏览器的Javascript客户端库（也可以从Node.js运行）
