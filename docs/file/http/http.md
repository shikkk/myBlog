# http

## http状态码

* 1xx：成功接收请求，但是处理过程还没结束，需要客户端再抛出一个请求才能完成整个过程。较少见
* 2xx：成功接收请求、并且已经处理完毕
   + **200**：标识客户端的请求已经被服务端正确处理
* 3xx：表示服务端虽然也处理了你的请求，但客户端还需要进一步工作，才可以请求
   + **301**：永久性重定向，表示资源已被分配了新的URL
   + **302**：临时性重定向，表示资源临时被分配了新的 URL
   + **304**: 表示服务器校验后发现资源没有改变，提醒客户端直接走缓存来取资源
* 4xx：客户端错误，意味着请求出错了。
   + **400**： 请求报文存在语法错误
   + **401**：请求要求身份验证。（常见于登录网页，服务器返回此状态码）
   + **403**：对请求资源的访问被服务器拒绝（多半是没权限）
   + **404**：资源不存在，可能路径不对，也可能服务端的路径有问题
* 5xx：服务器错误，意味着服务器内部的程序处理有问题
   + **500**：服务器在接受请求后进行处理的过程中，发生了内部错误
   + **502**：网关错误
   + **504**：网关超时
   
## http请求方法
方法|解释
:--|:--|
get|仅用作数据的读取，请求参数以query的形式附加
post|创建新资源或修改现有资源，请求参数以body的形式附加
head|只请求页面的首部，不请求页面内容。它允许我们单纯获取服务器的响应头信息
put|在能力上和post类似，区别于put的url指向的是具体的某个资源，而不能指向资源集合。同时put对资源的修改是幂等的
delete|用于删除指定的资源
options|用于获取指定服务能够支持的通信选项

## 对“无状态”的理解
HTTP 协议是无状态的，这个“无状态”到底是指什么？

与其说**无状态**，不如说是**无记忆**，http协议请求与请求之间是不关心对方的情况的。你上一秒出去一个A请求，下一秒出去一个B请求，那么B是完全感知不到A
请求曾经存在过的。总之俩个请求间是毫无瓜葛
* 如果想维持状态信息，该怎么办：cookie和session。
    + cookie：是存储在浏览器的小段文本，会在浏览器每次想同一服务器再发起请求是被携带并发送到服务器上。
    + session：session是存储在服务器的用户数据。浏览器第一次向服务发起请求时，服务器会为当前会话创建一个session，并把对应的session-id
    写入cookie，用来标识cookie。之后。用户每次请求都会携带一个session-id的cookie，服务器解析出session-id就会定位到用户信息

## 浏览器缓存分类
* 强缓存：浏览器先根据这个资源的http头信息来判断是否命中强缓存，如果命中则直接加在缓存中的资源，并不会将请求发送给服务器
    + 通过expires和cache-control控制
* 协商缓存：如果未命中强缓存，浏览器会将资源加载请求发送到服务器。服务器来判断浏览器本地缓存是否失效。如果可以使用，服务器并不会返回资源信息，浏览器继续从缓存中加载资源
    + 通过last-modify和E-tag控制
* 新的请求：如果未命中协商缓存，服务器会将完整的资源返回给浏览器，浏览器加载新资源，并且更新缓存
> 1. 为什么有expires又需要cache-control?
>   * 因为expires有和服务器和浏览器时间不同的问题，expires是绝对时间，cache-control是相对时间
> 2. last-modify和E-tag
>   * last-modify它有个精度问题，到秒。e-tag没有精度问题，只要文件改变，值就改变