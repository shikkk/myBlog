# 路由使用及实现

## 全局前置守卫 beforeEach
`router.beforeEach`当一个导航触发时，全局前置守卫按照创建顺序调用
```js
const router = new VueRouter({ ... })
router.beforeEach((to, from, next) => {
   // some code...
})
```
* `to` : 即将要进入的目标 路由对象
* `from`: 当前导航正要离开的路由
* `next`: 进行管道中的下一个钩子函数
## 全局后置守卫 afterEach
这些钩子不会接受 next 函数也不会改变导航本身
```js
router.afterEach((to, from) => {
  // some code...
})
```
## 路由独享的守卫beforeEnter
在路由配置上直接定义 `beforeEnter` 守卫，参数和前置路由守卫一样
```js
const router =  new VueRouter({
  routes: [
    {
      path: '/vueMenu',
      name: 'vueMenu',
      component: () => import(/* webpackChunkName: "vueMenu" */ '../components/vue'),
      beforeEnter(from, to, next) {
        console.log(from, to)
        setTimeout(()=> {
          next()
        },0)
      }
    },
  ]
})
```
## 组件内的守卫
* `beforeRouteEnter`
* `beforeRouteUpdate`  2.2新增
* `beforeRouteLeave`
```js
const vueMenu = {
template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`,不过可以用next访问组件实例
    next(vm => {
        //通过 `vm` 访问组件实例
    })
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```
### 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 路由简单实现
`vue-router`源码大致如下思想实现
### 路由配置
```js
import Vue from 'vue'
import ZkRouter from './zkRouter'
Vue.use(ZkRouter)
export default new ZkRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../components/home')
    },
    {
      path: '/vueMenu',
      name: 'vueMenu',
      component: () => import(/* webpackChunkName: "vueMenu" */ '../components/vue'),
      beforeEnter(from, to, next) {
        console.log(from, to)
        setTimeout(()=> {
          next()
        },0)
      }
    },
    {
      path: '/reactMenu',
      name: 'reactMenu',
      component: () => import(/* webpackChunkName: "reactMenu" */ '../components/react'),
    }
  ]
})
```
### 页面标签
```vue
<template>
  <div id="app">
    <zk-router-link to="/vueMenu" class="menu">vue</zk-router-link>
    <zk-router-link to="/reactMenu" class="menu">react</zk-router-link>
    <button @click="$zkrouter.push('/reactMenu')">go</button>
    <zk-router-view/>
  </div>
</template>
```
### 源码简单实现
```js
// zkRouter.js
// 路由入口
let Vue
class ZkRouter{
  // Vue.use(ZkRouter)会调用install方法
  static install(_Vue){
    Vue = _Vue // 缓存vue的实例
    // 对vue做扩展
    Vue.mixin({
      // 在vue构建之前加方法
      beforeCreate() {
        // 启动路由
        if (this.$options.router) {
          Vue.prototype.$zkrouter = this.$options.router

          this.$options.router.init()
        }
      }
    })
  }

  constructor(options) {
    // 接收main.js new Vue对象
    this.$options = options
    this.routerMap = {}
    // 使用vue的响应式机制，路由切换做一些响应
    this.app = new Vue({
      data: {
        // 默认路由
        cur: '/'
      }
    })
  }

  init() {
    /**
     * 启动整个路由，由插件use负责启动
     */
    // 1.监听hashchange事件
    this.bindEvents()
    // 2.处理路由表
    this.createRouteMap()
    // 3.初始化组件router-view router-link
    this.initRouteComponent()
  }

  bindEvents() {
    window.addEventListener('hashchange', this.onHashChange.bind(this), false)
    window.addEventListener('load', this.onHashChange.bind(this), false)
  }
  getHash() {
    return window.location.hash.slice(1) || '/'
  }
  getFromTo(e) {
    let from, to
    if (e.newURL) {
      from = e.oldURL.split('#')[1]
      to = e.newURL.split('#')[1]
    } else {
      from = ''
      to = this.getHash()
    }
    return {
      from,
      to
    }
  }
  onHashChange(e) {
    // 获取当前hash值
    let hash = this.getHash()
    let router = this.routerMap[hash]
    let {from ,to} = this.getFromTo(e)
    if(router.beforeEnter) {
      router.beforeEnter(from, to, ()=> {
        this.app.cur = hash
      })
    } else {
      // 修改当前路由地址 app.data.cur
      this.app.cur = hash
    }
  }

  createRouteMap() {
    // router数组转化为对象易查找
    this.$options.routes.forEach(element => {
      this.routerMap[element.path] = element
    })
  }
  initRouteComponent() {
    Vue.component('zk-router-view',{
      render: h=> {
        const com = this.routerMap[this.app.cur].component
        // 新建一个虚拟dom
        return h(com)
      }
    })

    Vue.component('zk-router-link',{
      props: {
        to: String
      },
      // h('组件名,'参数', '子元素')
      render(h) {
        // 新建一个a标签虚拟dom
        return h('a', {
          attrs: {
            href: `#${this.to}`
          }
        }, this.$slots.default)
      }
    })
  }
  push(url) {
    // hash模式直接赋值
    window.location.hash = url
  }
}
export default ZkRouter
```

#### [参考-github vue-router](https://github.com/vuejs/vue-router)
#### [参考-vue-router官网](https://router.vuejs.org/zh/installation.html)

