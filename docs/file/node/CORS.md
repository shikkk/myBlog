# CORS

## 设置请求头

```javascript
const http = require("http");
http.createServer(function (req, res) {
    // 获得客户端的Cookie
    let Cookies = {};
    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        let parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });
    console.log(Cookies);
    //获取自定义头
    console.log(req.headers.xtoken);
    // 向客户端设置一个Cookie
    res.setHeader('Set-Cookie','myCookie2=test');

    //res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080"); //带cookie的话，不能写*
    res.setHeader("Access-Control-Allow-Credentials", true); //允许带 cookie
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,xToken");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1'); // 用于告知网站是用何种语言或框架编写的
    res.writeHeader(200, {'Content-Type': 'application/json'});
}).listen(8080)
```