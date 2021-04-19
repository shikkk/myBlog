# $nextTick源码解读

vue源码目录 `vue/src/core/util/next-tick.js`  

1. `nextTick` 入参是一个回调函数，这个回调函数就是一个任务
2. 每次接受任务`nextTick`不会立即执行，而是把它push到`callbacks`这个异步队列里
3. 检查`pending`的值，如果为false，意味着“现在还没有一个异步更新队列被派发出去”，
    就调用`timerFunc`，把当前维护的异步队列派发出去
4. 然后调用`flushCallbacks`异步执行器函数，处理异步任务

```typescript
import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false  // 是否在使用微任务

const callbacks = [] // 异步更新队列
let pending = false  // 异步更新队列被派发出去 '锁'

// 任务执行器
function flushCallbacks () {
  // 把“锁”打开
  pending = false
  // 创造 callbacks 副本，避免副作用
  const copies = callbacks.slice(0)
  // callbacks 队列置空
  callbacks.length = 0
  // 逐个执行异步任务
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// 派发异步任务的函数
let timerFunc
// 根据不同浏览器，选择不同api来派发异步任务
// 当环境支持promise 
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
// 当环境支持 MutationObserver
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  //在本地Promise不可用的地方使用MutationObserver,
  // e.g. PhantomJS, iOS7, Android 4.4
  // ie 11中 MutationObserver 是不兼容的
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
// 当环境支持setImmediate
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // 从技术上讲，它利用了（宏）任务队列,
  // 但它仍然是比setTimeout更好的选择
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
// 当环境支持setTimeout
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
// 暴露nextTick方法
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  // 维护一个异步更新队列
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
   // pending是一个锁，确保任务执行有序、不重复
  if (!pending) {
    pending = true
    timerFunc()
  }
  // 处理入参不是回调的情况
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```
