# Vue3使用

## 1.setup
* 组件内使用 `Composition Api` 的入口
* 接受俩个参数
    1. props：组件传入的属性
        * 接收的数据是响应式的，会及时更新，所以不能使用es6结构，结构会消除他的响应式
        * 如想使用结构，要保持响应式，使用 `toRefs`
    2. context：提供vue2中 `this` 常用的三个属性：`attrs` 、 `slot` 、 `emit`
```js
export default defineComponent({
    setup (props, context) {}
})
```  
* setup在 `beforeCreate`和 `created` 之前执行
```javascript
export default defineComponent({
    beforeCreate() {
        console.log("----beforeCreate----");
    },
    created() {
        console.log("----created----");
    },
    setup() {
        console.log("----setup----");
    },
})
```
<img :src="$withBase('/images/vue/setup.jpg')">

#### <font color=red>由于在执行setup 时尚未创建组件实例，因此在 setup 选项中没有 this</font>
