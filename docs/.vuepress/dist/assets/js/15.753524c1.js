(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{370:function(t,v,_){"use strict";_.r(v);var e=_(45),l=Object(e.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"http"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http"}},[t._v("#")]),t._v(" http")]),t._v(" "),_("h2",{attrs:{id:"http状态码"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http状态码"}},[t._v("#")]),t._v(" http状态码")]),t._v(" "),_("ul",[_("li",[t._v("1xx：成功接收请求，但是处理过程还没结束，需要客户端再抛出一个请求才能完成整个过程。较少见")]),t._v(" "),_("li",[t._v("2xx：成功接收请求、并且已经处理完毕\n"),_("ul",[_("li",[_("strong",[t._v("200")]),t._v("：标识客户端的请求已经被服务端正确处理")])])]),t._v(" "),_("li",[t._v("3xx：表示服务端虽然也处理了你的请求，但客户端还需要进一步工作，才可以请求\n"),_("ul",[_("li",[_("strong",[t._v("301")]),t._v("：永久性重定向，表示资源已被分配了新的URL")]),t._v(" "),_("li",[_("strong",[t._v("302")]),t._v("：临时性重定向，表示资源临时被分配了新的 URL")]),t._v(" "),_("li",[_("strong",[t._v("304")]),t._v(": 表示服务器校验后发现资源没有改变，提醒客户端直接走缓存来取资源")])])]),t._v(" "),_("li",[t._v("4xx：客户端错误，意味着请求出错了。\n"),_("ul",[_("li",[_("strong",[t._v("400")]),t._v("： 请求报文存在语法错误")]),t._v(" "),_("li",[_("strong",[t._v("401")]),t._v("：请求要求身份验证。（常见于登录网页，服务器返回此状态码）")]),t._v(" "),_("li",[_("strong",[t._v("403")]),t._v("：对请求资源的访问被服务器拒绝（多半是没权限）")]),t._v(" "),_("li",[_("strong",[t._v("404")]),t._v("：资源不存在，可能路径不对，也可能服务端的路径有问题")])])]),t._v(" "),_("li",[t._v("5xx：服务器错误，意味着服务器内部的程序处理有问题\n"),_("ul",[_("li",[_("strong",[t._v("500")]),t._v("：服务器在接受请求后进行处理的过程中，发生了内部错误")]),t._v(" "),_("li",[_("strong",[t._v("502")]),t._v("：网关错误")]),t._v(" "),_("li",[_("strong",[t._v("504")]),t._v("：网关超时")])])])]),t._v(" "),_("h2",{attrs:{id:"http请求方法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http请求方法"}},[t._v("#")]),t._v(" http请求方法")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",{staticStyle:{"text-align":"left"}},[t._v("方法")]),t._v(" "),_("th",{staticStyle:{"text-align":"left"}},[t._v("解释")])])]),t._v(" "),_("tbody",[_("tr",[_("td",{staticStyle:{"text-align":"left"}},[t._v("get")]),t._v(" "),_("td",{staticStyle:{"text-align":"left"}},[t._v("仅用作数据的读取，请求参数以query的形式附加")])]),t._v(" "),_("tr",[_("td",{staticStyle:{"text-align":"left"}},[t._v("post")]),t._v(" "),_("td",{staticStyle:{"text-align":"left"}},[t._v("创建新资源或修改现有资源，请求参数以body的形式附加")])]),t._v(" "),_("tr",[_("td",{staticStyle:{"text-align":"left"}},[t._v("head")]),t._v(" "),_("td",{staticStyle:{"text-align":"left"}},[t._v("只请求页面的首部，不请求页面内容。它允许我们单纯获取服务器的响应头信息")])]),t._v(" "),_("tr",[_("td",{staticStyle:{"text-align":"left"}},[t._v("put")]),t._v(" "),_("td",{staticStyle:{"text-align":"left"}},[t._v("在能力上和post类似，区别于put的url指向的是具体的某个资源，而不能指向资源集合。同时put对资源的修改是幂等的")])]),t._v(" "),_("tr",[_("td",{staticStyle:{"text-align":"left"}},[t._v("delete")]),t._v(" "),_("td",{staticStyle:{"text-align":"left"}},[t._v("用于删除指定的资源")])]),t._v(" "),_("tr",[_("td",{staticStyle:{"text-align":"left"}},[t._v("options")]),t._v(" "),_("td",{staticStyle:{"text-align":"left"}},[t._v("用于获取指定服务能够支持的通信选项")])])])]),t._v(" "),_("h2",{attrs:{id:"对-无状态-的理解"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#对-无状态-的理解"}},[t._v("#")]),t._v(" 对“无状态”的理解")]),t._v(" "),_("p",[t._v("HTTP 协议是无状态的，这个“无状态”到底是指什么？")]),t._v(" "),_("p",[t._v("与其说"),_("strong",[t._v("无状态")]),t._v("，不如说是"),_("strong",[t._v("无记忆")]),t._v("，http协议请求与请求之间是不关心对方的情况的。你上一秒出去一个A请求，下一秒出去一个B请求，那么B是完全感知不到A\n请求曾经存在过的。总之俩个请求间是毫无瓜葛")]),t._v(" "),_("ul",[_("li",[t._v("如果想维持状态信息，该怎么办：cookie和session。\n"),_("ul",[_("li",[t._v("cookie：是存储在浏览器的小段文本，会在浏览器每次想同一服务器再发起请求是被携带并发送到服务器上。")]),t._v(" "),_("li",[t._v("session：session是存储在服务器的用户数据。浏览器第一次向服务发起请求时，服务器会为当前会话创建一个session，并把对应的session-id\n写入cookie，用来标识cookie。之后。用户每次请求都会携带一个session-id的cookie，服务器解析出session-id就会定位到用户信息")])])])])])}),[],!1,null,null,null);v.default=l.exports}}]);