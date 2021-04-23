# 前端网络安全

## XSS跨站请求攻击
XSS(Cross Site Scripting)攻击全称跨站脚本攻击
### 案例
1. 一个博客网站，发飙一篇博客，其中嵌入`<script>` 脚本
2. 脚本内容获取 `cookie`（用户敏感信息）,发送到我的服务器（服务器配合跨域）
3. 发布这个博客，有人查看他，我轻松收割访问者的cookie
### 预防
1. 替换特殊字符，如`<`变为 `&lt;` ,`>` 变为 `&gt;`
    * `<script>`变为`&lt;script&gt`,直接显示，而不作为脚本执行
    * 前后端都要做
2. CSP
* 内容安全策略 (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等
* 本质是建立白名单,开发者明确告诉浏览器那些外部资源可以进行加载和执动，我们只需要配置规则，如何拦截由浏览器自己实现，
我们可以通过下面配置来尽量减少XSS攻击：
    1. 使用 Content-Security-Policy HTTP头部 来指定策略
```
设置HTTP Header中的Content-Security-Policy: policy
```
   2. 设置meta标签， 直接在页面添加meta标签
```html
// 这种方式最简单，但是也有些缺陷，每个页面都需要添加，而且不能对限制的域名进行上报。
<meta http-equiv="Content-Security-Policy" content="default-src 'self' *.xx.com *.xx.cn 'unsafe-inline' 'unsafe-eval';">
```
3. 常见用例(设置HTTP Header来举例)
```js
//一个网站管理者想要所有内容均来自站点的同一个源 (不包括其子域名) 只允许加载本站资源
Content-Security-Policy: default-src ‘self’

// 一个网站管理者允许内容来自信任的域名及其子域名 (域名不必须与CSP设置所在的域名相同)
Content-Security-Policy: default-src ‘self’ *.trusted.com

// 一个网站管理者允许网页应用的用户在他们自己的内容中包含来自任何源的图片, 但是限制音频或视频需从信任的资源提供者(获得)，所有脚本必须从特定主机服务器获取可信的代码.
Content-Security-Policy: default-src ‘self’; img-src *; media-src media1.com media2.com; script-src userscripts.example.com

// 只允许加载HTTPS协议图片
Content-Security-Policy: img-src https://*

// 允许加载任何来源框架
Content-Security-Policy: child-src ‘none’
```

## CSRF跨站请求伪造
CSRF（Cross-site request forgery）跨站请求伪造
### 案例
1. 你正在购物，看中了某个商品，商品id是100
2. 付费接口是xxx.com/pay?id=100,单没有任何付款验证
3. 我是攻击者，我看中了一个商品，id是200
4. 我向你发送一份电子邮件，标题很吸吸引人
5. 邮件正文隐藏着一个`<img src=xxx.com/pay?id=200 />`
6. 你查看邮件就会帮我买了id为200的商品
### 预防
* 使用post接口做支付,get请求不做对数据进修改的行为
* 不让第三方网站访问到cookie
* 阻止第三方网站请求接口
* 付款时增加验证
### SameSite
可以对Cookie设置SameSite属性，该属性表示Cookie不随着跨域请求发送，可以很大程度上减少CSRF的攻击，
但是该属性目前并**不是所有浏览器都兼容**
#### 它有三个值
1. **strict**(严格的)  
Strict最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie
```js
Set-Cookie: CookieName=CookieValue; SameSite=Strict;
```
这个规则过于严格，可能造成非常不好的用户体验。比如，当前网页有一个 GitHub 链接，用户点击跳转就不会带有 GitHub 的 Cookie，跳转过去总是未登陆状态  
2. **Lax**  
Lax规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。
```js
Set-Cookie: CookieName=CookieValue; SameSite=Lax;
```
导航到目标网址的 GET 请求，只包括三种情况：链接，预加载请求，GET 表单。详见下表。
请求类型|示例|正常情况|Lax
:--|:--|:--|:--|
链接|`<a href="..."></a>`|发送cookie|发送cookie
预加载|`<link rel="prerender" href="..."/>`|发送cookie|发送cookie
get表单|`<form method="GET" action="...">`|发送cookie|发送cookie
post表单|`<form method="POST" action="...">`|发送cookie|不发送
iframe|`<form method="POST" action="...">`|发送cookie|不发送
ajax|`$.get('...')`|发送cookie|不发送
image|`<img src="...">`|发送cookie|不发送

3. **none**

Chrome 计划将Lax变为默认设置。这时，网站可以选择显式关闭SameSite属性，将其设为None。不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

```js
// 设置无效
Set-Cookie: widget_session=abc123; SameSite=None

// 设置有效
Set-Cookie: widget_session=abc123; SameSite=None; Secure
```

#### [参考-阮一峰 Cookie 的 SameSite 属性](http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)