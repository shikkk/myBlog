# Vue组件使用

## 动态组件
* `:is="component-name"` 用法
* 需要根据数据，动态渲染的场景。即组件类型不确定
```vue
<template>
    <component :is="curPage"/>
</template>
<script>
import edit from '../xxx'
export default {
    components: {
        edit
    },
    data() {
        return {
            curPage: 'edit'
        }
    }
}
</script>
```
## 异步组件
页面加载时同步加载很多组件会同时打包，体积太大，消耗性能。不是立刻显示的组件，推介使用是异步加载（不会在页面加载时打包）
* import()函数
* 按需加载，异步加载大组件
* vue常见性能优化点
```vue
<template>
    <edit v-if="isShowEdit"/>
    <button @click="isShowEdit = true"></button>
</template>
<script>
export default {
    components: {
        edit: () =>('../xxx')
    },
    data() {
        return {
            isShowEdit: false
        }
    }
}
</script>
```
## 缓存组件（keep-alive）
* [keep-alive源码解读](../vue/keepAlive.md)
* 频繁切换不需要重复渲染的组件
* 在组件切换过程中将状态保留在内存中，防止重复渲染DOM，减少加载时间及性能消耗，提高用户体验性
* vue常见性能优化点
* 使用场景：
    * 商品列表页点击商品跳转到商品详情，返回后仍显示原有信息
    * 订单列表跳转到订单详情，返回，等等场景。
* **原理**：在 created 函数调用时将需要缓存的 VNode 节点保存在 this.cache 中／在 render（页面渲染） 时，如果 VNode 的 name 符合缓存条件（可以用 include 以及 exclude 控制），则会从 this.cache 中取出之前缓存的 VNode 实例进行渲染
    
* props
    * include - 字符串或正则表达式。只有名称匹配的组件会被缓存
    * exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存
    * max - 数字。最多可以缓存多少组件实例
### keep-alive生命周期
* 初次进入时：created > mounted > activated
* 退出后触发：deactivated
* 再次进入：触发activated，只执行一次的放在 mounted 中

```vue
<!--app.vue-->
<div id="app">
    <keep-alive>
        <!-- 需要缓存的视图组件 --> 
        <router-view v-if="$route.meta.keepAlive"></router-view>
     </keep-alive>
      <!-- 不需要缓存的视图组件 -->
     <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
```
```javascript
// 路由设置
{
  path: 'list',
  name: 'itemList', // 商品管理
  component (resolve) {
    require(['@/pages/item/list'], resolve)
 },
 meta: {
  keepAlive: true,
  title: '商品管理'
 }
}
```

## 组件公共抽离（mixin）
* 对个组件有相同的逻辑，抽离出来
```vue
<script>
import myMixin from './myMixin'
export default {
    mixin: [myMixin] // 可添加多个，自动合并起来
}
</script>
```
* 问题：
    * 变量来源不明确，不利于阅读
    * 多mixin可能会造成命名冲突
    * mixin和组件可能出现多对多的关系，复杂度较高
