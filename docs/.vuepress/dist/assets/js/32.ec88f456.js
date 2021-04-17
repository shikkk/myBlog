(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{387:function(s,t,a){"use strict";a.r(t);var e=a(45),r=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"mysql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mysql"}},[s._v("#")]),s._v(" mySql")]),s._v(" "),a("h2",{attrs:{id:"mysql下载"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mysql下载"}},[s._v("#")]),s._v(" mySql下载")]),s._v(" "),a("ul",[a("li",[s._v("mysql 工具下载"),a("a",{attrs:{href:"https://dev.mysql.com/downloads/mysql/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://dev.mysql.com/downloads/mysql/"),a("OutboundLink")],1)]),s._v(" "),a("li",[s._v("mysql workbench 可视化客户端工具"),a("a",{attrs:{href:"https://dev.mysql.com/downloads/workbench/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://dev.mysql.com/downloads/workbench/"),a("OutboundLink")],1),a("br"),s._v(" "),a("strong",[s._v("初始状态：")])]),s._v(" "),a("li",[s._v("用户名：root")]),s._v(" "),a("li",[s._v("密码：12345678")])]),s._v(" "),a("h2",{attrs:{id:"基本使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本使用"}},[s._v("#")]),s._v(" 基本使用")]),s._v(" "),a("table",[a("thead",[a("tr",[a("th",[s._v("命令")]),s._v(" "),a("th",{staticStyle:{"text-align":"left"}},[s._v("解释")])])]),s._v(" "),a("tbody",[a("tr",[a("td",[s._v("show databases;")]),s._v(" "),a("td",{staticStyle:{"text-align":"left"}},[s._v("显示所有数据库")])]),s._v(" "),a("tr",[a("td",[s._v("use myblog;")]),s._v(" "),a("td",{staticStyle:{"text-align":"left"}},[s._v("显示（myblog项目）数据库")])]),s._v(" "),a("tr",[a("td",[s._v("show tables;")]),s._v(" "),a("td",{staticStyle:{"text-align":"left"}},[s._v("显示（myblog项目）中的表")])]),s._v(" "),a("tr",[a("td",[s._v("-- show tables")]),s._v(" "),a("td",{staticStyle:{"text-align":"left"}},[s._v("注释代码")])])])]),s._v(" "),a("h3",{attrs:{id:"mysql增删改查"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mysql增删改查"}},[s._v("#")]),s._v(" mySql增删改查")]),s._v(" "),a("ol",[a("li",[s._v("增")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("insert into "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("users")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("username"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("password"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("values")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'zk'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'123456'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'志凯'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("  \n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("查")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 查询users表中的所有列  尽量不适用* ，会耗费性能")]),s._v("\nselect "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" users"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 查询users表中的所有的 id和username ")]),s._v("\nselect  id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("username "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" users"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// 查询users表中的 username="zk" 的数据   where为条件关键词 ')]),s._v("\nselect  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" users  where username"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"zk"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// 查询users表中的 username="zk" 和 password="123456"  的数据 ')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// and  为并且   or  或者 ")]),s._v("\nselect  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" users  where username"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"zk"')]),s._v(" and password"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"123456"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 模糊查询users表中的 username带z 的数据 ")]),s._v("\nselect  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" users  where username like "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"%z%"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 查询id为正序的数据")]),s._v("\nselect  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" users  where username like "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"%z%"')]),s._v("  order by id \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 查询id为倒序的数据")]),s._v("\nselect  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" users  where username like "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"%z%"')]),s._v("  order by id  desc\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])]),a("ol",{attrs:{start:"3"}},[a("li",[s._v("改")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("SET")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("SQL_SAFE_UPDATES")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//解决执行报错问题  删除、更新都会发生")]),s._v("\n\nupdate  users set "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[s._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[s._v("`")])]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'石志凯'")]),s._v(" where username"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'zk'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("ol",{attrs:{start:"4"}},[a("li",[s._v("删除")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("delete")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" users where username"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'zk'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"查询mysql版本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查询mysql版本"}},[s._v("#")]),s._v(" 查询mysql版本")]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("select "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("version")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"node-mysql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node-mysql"}},[s._v("#")]),s._v(" node-mysql")]),s._v(" "),a("ol",[a("li",[s._v("安装mysql")])]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("npm install mysql\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("连接mysql会报错,node8.00以上")])]),s._v(" "),a("ul",[a("li",[s._v("sqlMessage: "),a("font",{attrs:{color:"red"}},[s._v("'Client does not support authentication protocol requested by server; consider upgrading MySQL client'")])],1),s._v(" "),a("li",[s._v("解决-命令行输入：\n"),a("ol",[a("li",[s._v("ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';")]),s._v(" "),a("li",[s._v("刷新：FLUSH PRIVILEGES;")])])])])])}),[],!1,null,null,null);t.default=r.exports}}]);