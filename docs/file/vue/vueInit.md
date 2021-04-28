# new Vue发生了什么

`new`关键字是实例化一个对象，而`Vue`实际上是一个类型，类在js中是用`Function`来实现的  

#### 初始Vue，源码`src/core/instance/index.js`

初始Vue的时候调用了`this._init(options)`方法
```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 执行初始化方法
  this._init(options)
}
```
`_init(options)` 方法在 `src/core/instance/init.js`中定义

```ts
Vue.prototype._init = function (options?: Object) {
  const vm: Component = this
  // a uid
  vm._uid = uid++

  let startTag, endTag
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    startTag = `vue-perf-start:${vm._uid}`
    endTag = `vue-perf-end:${vm._uid}`
    mark(startTag)
  }

  // a flag to avoid this being observed
  vm._isVue = true
  // merge options 合并配置
  if (options && options._isComponent) {
    // 优化内部组件实例化
    // 因为动态选项合并非常慢，而且没有
    // 内部组件选项需要特殊处理。
    
    // 初始化内部组件
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(
      // 解析构造函数选项
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    initProxy(vm)
  } else {
    vm._renderProxy = vm
  }
  // expose real self
  vm._self = vm
  initLifecycle(vm) // 初始化生命周期
  initEvents(vm)   // 初始化事件中心
  initRender(vm)  // 初始化渲染
  callHook(vm, 'beforeCreate')
  initInjections(vm) // 初始化 data/props
  initState(vm)   // 初始化状态
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')

  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    vm._name = formatComponentName(vm, false)
    mark(endTag)
    measure(`vue ${vm._name} init`, startTag, endTag)
  }
  // 检测到如果有 el 属性，则调用 vm.$mount 方法挂载 vm,
  // 挂载的目标就是把模板渲染成最终的 DOM
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}
```

* Vue 初始化主要就干了几件事情:
    1. 合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等。
    2. 在初始化的最后，检测到如果有 el 属性，则调用 vm.$mount 方法挂载 vm
    3. 挂载的目标就是把模板渲染成最终的 DOM
