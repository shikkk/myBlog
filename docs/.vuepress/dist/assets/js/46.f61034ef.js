(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{402:function(t,e,a){"use strict";a.r(e);var l=a(45),s=Object(l.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"vue2生命周期"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue2生命周期"}},[t._v("#")]),t._v(" Vue2生命周期")]),t._v(" "),a("h2",{attrs:{id:"生命周期是什么"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生命周期是什么"}},[t._v("#")]),t._v(" 生命周期是什么？")]),t._v(" "),a("p",[t._v("Vue实例从创建到销毁的过程，也就是重开始创建、初始化数据、编译模板、挂载DOM->渲染、更新->渲染、卸载一些列的过程，为Vue的生命周期")]),t._v(" "),a("h2",{attrs:{id:"每个生命周期的作用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#每个生命周期的作用"}},[t._v("#")]),t._v(" 每个生命周期的作用")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("钩子")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("命名")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("作用")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("beforeCreate")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("组件创建前")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("此阶段为实例初始化之后，this指向创建的实例，此时的数据观察事件机制都未形成，不能获得DOM节点")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("created")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("组件创建后")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("组件实例已经完全创建，完成数据（data、props、computed）的初始化导入依赖项，可访问 data computed watch methods 上的方法和数据，但真实dom还没有生成，$el还不可用，若在此阶段进行DOM操作一定要放在Vue.nextTick()的回调函数中")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("beforeMount")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("挂载前")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("得不到具体的DOM元素，但vue挂载的根节点已经创建")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("mounted")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("挂载后")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("完成创建vm.$el，和双向绑定，可在此钩子操作DOM")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("beforeUpdate")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("组件数据更新前")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("数据驱动DOM，在数据更新后虽然没有立即更新数据，但是DOM中的数据会改变，这是vue双向数据绑定的作用。")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("update")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("组件数据更新后")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("数据更新后，完成虚拟DOM的重新渲染和打补丁")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("activited")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("keep-alive专属，组件被激活时调用")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("在使用vue-router时有时需要使用"),a("code",[t._v("<keep-alive></keep-alive>")]),t._v("来缓存组件状态，这个时候created钩子就不会被重复调用了")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("deadctivated")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("keep-alive专属，组件被销毁时调用")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[a("code",[t._v("<keep-alive></keep-alive>")]),t._v("组件被移除时使用")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("beforeDestory")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("组件销毁前调用")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("可做一些删除提示，如：您确定删除xx吗？")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("destoryed")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("组件销毁后调用")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("当前组件已被删除，销毁监听事件，组件、事件、子实例也被销毁。这时组件已经没有了，无法操作里面的任何东西了")])])])]),t._v(" "),a("h2",{attrs:{id:"第一次页面加载页面触发那些钩子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第一次页面加载页面触发那些钩子"}},[t._v("#")]),t._v(" 第一次页面加载页面触发那些钩子？")]),t._v(" "),a("p",[t._v("依次是：beforeCreate-> created -> beforeMount -> mounted")]),t._v(" "),a("h2",{attrs:{id:"父子组件生命周期执行顺序"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#父子组件生命周期执行顺序"}},[t._v("#")]),t._v(" 父子组件生命周期执行顺序")]),t._v(" "),a("ul",[a("li",[t._v("父子组件依次：父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted")])]),t._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("beforeCreate:我是父组件的钩子\ncreated:我是父组件的钩子\nbeforeMount:我是父组件的钩子\nbeforeCreate:我是子组件1的钩子\ncreated:我是子组件1的钩子\nbeforeMount:我是子组件1的钩子\nmounted:我是子组件1的钩子\nmounted:我是父组件的钩子\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])]),a("ul",[a("li",[t._v("父子更新过程：父beforeUpdate->子beforeUpdate->子updated->父updated")]),t._v(" "),a("li",[t._v("父子销毁过程：父beforeDestroy->子beforeDestroy->子destroyed->父destroyed")])])])}),[],!1,null,null,null);e.default=s.exports}}]);