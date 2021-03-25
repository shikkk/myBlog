# vue2使用

## EventBus

EventBus称为时间总线。不相关的组件可以通信，如果项目不需要类似Vuex这样的库来数据通信，可以考虑事件总线。但是DOM渲染后on方法才能
监听到数据。

### 1. 初始化EventBus

```javascript
// 创建一个event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()

// 也可以直接在main.js挂载到vue实例上
// main.js
Vue.prototype.$EventBus = new Vue()

// 发送事件
EventBus.$emit("aMsg", '来自A页面的消息')
// 接收事件
EventBus.$on("aMsg", (msg) => {
  // 发送来的消息
  console.log(msg)
});
// 移除事件
EventBus.$off('aMsg', {})
```
