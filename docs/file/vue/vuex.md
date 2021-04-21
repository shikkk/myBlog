# Vuex使用及原理
Vuex是专门为Vuejs应用程序设计的状态管理工具。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

## Vuex的构成
### state
state是存储的单一状态，是存储的基本数据
```js
const store = new Vuex.Store({
  state: {
    name: 'szk'
  }
})
```
#### 组件内调用state数据
1. this.$store.state.name
2. `mapState`辅助函数
```js
import { mapState } from 'vuex'
export default {
  // ...
  computed: {
    ...mapState([
        'name'
    ])
  }
}
```
### Getters
* getters是store的计算属性，对state的加工，是派生出来的数据。
* 像computed计算属性一样，getter返回的值会根据它的依赖被缓存起来，且只有当它的依赖值发生改变才会被重新计算
```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: 'z', done: true },
      { id: 2, text: 'k', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```
#### 组件内调用state数据
```js
computed: {
  doneTodos () {
    return this.$store.getters.doneTodos
  }
}
```
2. `mapGetters`辅助函数
```js
import { mapGetters } from 'vuex'
export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodos'
      // ...
    ])
  }
}
```
### Mutations
* mutations提交更改数据，使用store.commit方法更改state存储的状态
* 同步函数
```js
const store = new Vuex.Store({
  state: {
    name: 'szk'
  },
  mutations: {
    changeName (state,newName) {
      state.name = newName
    }
  }
})
```
#### 组件内使用
```js
store.commit('changeName', 'shizhikai')
// 对象风格
mutations: {
    changeName (state,data) {
      state.name = data.newName
    }
}
store.commit({
  type: 'changeName',
  newName: 'shizhikai'
})
```
2. `mapMutations`辅助函数
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations({
      changeName: 'changeName' 
    }),
    clickName() {
        this.changeName('shizhikai')
    }
  }
}
```
### Actions
* 可以做任何异步操作
* actions像一个装饰器，提交mutation，而不是直接变更状态
```js
const store = new Vuex.Store({
  state: {
    name: 'szk'
  },
  mutations: {
    changeName (state,data) {
      state.name = data
    }
  },
  actions: {
    changeMyName (context,data) {
      context.commit('changeName', data)
    }
  }
})
```
#### 触发actions
```js
store.dispatch('changeMyName', 'shizhikai')
// 以对象形式分发
store.dispatch({
  type: 'changeMyName',
  name: 'shizhikai'
})
```
2. `mapActions `辅助函数
```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions({
      changeName: 'changeName' 
    }),
    clickName() {
        this.changeName('shizhikai')
    }
  }
}
```
### Module
Module是store分割的模块，每个模块拥有自己的state、getters、mutations、actions
```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
## vuex使用
```js
import Vuex from 'vuex';
Vue.use(Vuex); // 1. vue的插件机制，安装vuex
let store = new Vuex.Store({ // 2.实例化store，调用install方法
    state,
    getters,
    modules,
    mutations,
    actions,
    plugins
});
new Vue({ // 3.注入store, 挂载vue实例
    store,
    render: h=>h(app)
}).$mount('#app');
```
## 设计思想
1. 借鉴了Flux、Redux
2. 将数据存放到全局的store，再将store挂载到每个vue实例组件中，利用Vue.js的数据响应机制来进行高效的状态更新

## 原理解析
1. 在vue项目中先安装vuex,注入vuex插件
```js
import Vuex from 'vuex';
Vue.use(Vuex); // 1. vue的插件机制，安装vuex
```
2. 使用Vue.use(vuex)时，会调用vuex的install方法  
`src/store.js`
```js
let Vue // bind on install 把vue实例缓存起来
export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (__DEV__) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}
```
3. applyMixin使用vue混入机制，在vue的beforeCreate钩子函数前混入vuexInit方法  
`src/mixins.js`
```js
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])
  if (version >= 2) {
    // beforeCreate钩子函数前混入vuexInit方法
    // 组件的创建过程先父后子
    Vue.mixin({ beforeCreate: vuexInit }) 
  } else {
    // some code
  }
  
  function vuexInit () {
    // vue根实例数据 new Vue({store,render: h=>h(app)})
    const options = this.$options
    // 如果根实例有store，store赋到this.$store
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    // 如果当前组件不是根实例组件，如：home.vue
    // 当前组件的父级有store, 把根实例的store赋到this.$store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```  
4. 当前的this.$store = options.store || options.parent.$store实现响应式
* Vuex的state状态是响应式，是借助vue的data是响应式，将state存入vue实例组件的data中
* Vuex的getters则是借助vue的计算属性computed实现数据实时监听
```js
function resetStoreVM (store, state, hot) {
  const oldVm = store._vm
  // 设置 getters 属性
  store.getters = {}
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  // 遍历 wrappedGetters 属性
  forEachValue(wrappedGetters, (fn, key) => {
    // 给 computed 对象添加属性
    computed[key] = partial(fn, store)
    // 重写 get 方法
    // store.getters.xx 其实是访问了store._vm[xx]，其中添加 computed 属性
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  const silent = Vue.config.silent
  Vue.config.silent = true
  // 创建Vue实例来保存state，同时让state变成响应式
  // store._vm._data.$$state = store.state
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  Vue.config.silent = silent

  // 只能通过commit方式更改状态
  if (store.strict) {
    enableStrictMode(store)
  }
}
```