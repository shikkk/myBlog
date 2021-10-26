# vue.use 使用及实现原理

## Vue.use( plugin )
* 参数：
  * `plugin: { object | Function}`
  
## 做什么的？

* vue全局注册插件的方法

## 用法
> 如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 `install` 方法。`install`方法调用时，会将 `Vue` 作为参数传入

1. 该方法需要在调用 `new Vue()` 之前被调用。
2. 当 `install` 方法被同一个插件多次调用，插件将只会被安装一次

### 注意以上俩点，我们看源码是怎么实现的！
Å
## 实现原理 - 源码

源码位置： `src/core/global-api/use.js`

```ts
import { toArray } from '../util/index'

// 将 `Vue` 作为参数传入
export function initUse (Vue: GlobalAPI) {
    // 插件传入类型为 Function 或 Object
  Vue.use = function (plugin: Function | Object) {
    // 先声明一个installedPlugins数组, 用来存放安装过的插件
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
      // 当新的插件注册后，首先判断缓存的数组中有没有
    if (installedPlugins.indexOf(plugin) > -1) {
      // 如果有 直接返回 vue实例， 防止重复安装。 也就是上面用法中的第2点
      return this
    }

    // 附加参数处理
    // 将其他参数都通过toArray方法转化成数组
    const args = toArray(arguments, 1)
    // 然后将vue实例放到数组的第一个位置，后续调用install方法都必须传入vue作为参数
    args.unshift(this)
    // 如果传入的plugin的install方法是一个函数
    if (typeof plugin.install === 'function') {
        // 那就把参数传入并执行
      plugin.install.apply(plugin, args)
       // 如果传入的 plugin 是方法那就直接执行
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    // 把插件存在数组中
    installedPlugins.push(plugin)
    // 返回 vue 实例
    return this
  }
}

// toArray方法  src/shared/util.js 这个里面有好多工具函数，可以参考使用
// 将类数组对象转换为真正的数组.
export function toArray (list: any, start?: number): Array<any> {
    start = start || 0
    let i = list.length - start
    const ret: Array<any> = new Array(i)
    while (i--) {
        ret[i] = list[i + start]
    }
    return ret
}
```
