(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{395:function(s,a,t){"use strict";t.r(a);var e=t(45),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"babel"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#babel"}},[s._v("#")]),s._v(" babel")]),s._v(" "),t("p",[s._v("babel是一个JS编译器，用来转换最新的JS语法，比如把ES6, ES7等语法转化成ES5语法，从而能够在大部分浏览器中运行")]),s._v(" "),t("h2",{attrs:{id:"_1-安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装"}},[s._v("#")]),s._v(" 1.安装")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("npm install @babel/core @babel/preset-env babel-loader --save-dev\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"_2-配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-配置"}},[s._v("#")]),s._v(" 2.配置")]),s._v(" "),t("ul",[t("li",[s._v(".babelrc")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"presets"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"@babel/preset-env"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("   "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// preset-env一堆转义es6代码插件的集合")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"plugins"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("        "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 如果preset-env不满足一些语法的转义，配置plugins")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("ul",[t("li",[s._v("webpack.config.js")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("module"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    rules"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        test"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("\\.js$")]),t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        loader"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'babel-loader'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//转换es6代码")]),s._v("\n        include"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" path"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("join")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("__dirname"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'src'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//包含某个目录走这个loader")]),s._v("\n        exclude"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("node_modules")]),t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),s._v("   "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//不包含node_modules")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("h2",{attrs:{id:"_3-插件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-插件"}},[s._v("#")]),s._v(" 3.插件")]),s._v(" "),t("h3",{attrs:{id:"_3-1-babel-polyfill-补丁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-babel-polyfill-补丁"}},[s._v("#")]),s._v(" 3.1 babel-polyfill(补丁)")]),s._v(" "),t("ul",[t("li",[s._v("兼容低版本浏览器")]),s._v(" "),t("li",[s._v("polyfill支持语法少")]),s._v(" "),t("li",[s._v("core.js兼容低版本浏览器语法的集合\n"),t("ul",[t("li",[s._v("不兼容generator语法需要单独引入regenerator")])])])]),s._v(" "),t("p",[s._v("babel-polyfill 以上俩者不足的集合")]),s._v(" "),t("ul",[t("li",[s._v("babel7.4之后弃用babel-polyfill推介直接使用core.js和regenerator")])]),s._v(" "),t("p",[s._v("缺点：")]),s._v(" "),t("ul",[t("li",[s._v("污染全局环境")])]),s._v(" "),t("h3",{attrs:{id:"_3-2-babel-runtime"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-babel-runtime"}},[s._v("#")]),s._v(" 3.2 babel-runtime")]),s._v(" "),t("p",[s._v("解决全局污染")])])}),[],!1,null,null,null);a.default=n.exports}}]);