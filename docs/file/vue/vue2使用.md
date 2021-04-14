# vue2使用

## EventBus

EventBus称为事件总线。不相关的组件可以通信，如果项目不需要类似Vuex这样的库来数据通信，可以考虑事件总线。但是DOM渲染后on方法才能
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
## provide/inject
#### provide/ inject 是vue2.2.0新增的api, 简单来说就是父组件中通过provide来提供变量, 然后再子组件中通过inject来注入变量
假设有三组件，A, B, C 三个组件
```vue
// A.vue
<template>
  <div>
	<comB></comB>
  </div>
</template>
<script>
  import comB from '../comB.vue'
  export default {
    name: "A",
    provide: {
      for: "demo"
    },
    components:{
      comB
    }
  }
</script>

// B.vue
<template>
  <div>
    {{demo}}
    <comC></comC>
  </div>
</template>

<script>
  import comC from '../comC.vue'
  export default {
    name: "B",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    },
    components: {
      comC
    }
  }
</script>

// C.vue
<template>
  <div>
    {{demo}}
  </div>
</template>
<script>
  export default {
    name: "C",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    }
  }
</script>
```
