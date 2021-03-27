# Vue2生命周期

## 生命周期是什么？
Vue实例从创建到销毁的过程，也就是重开始创建、初始化数据、编译模板、挂载DOM->渲染、更新->渲染、卸载一些列的过程，为Vue的生命周期

## 每个生命周期的作用
钩子|命名|作用
:--|:--|:--|
beforeCreate|组件创建前|此阶段为实例初始化之后，this指向创建的实例，此时的数据观察事件机制都未形成，不能获得DOM节点
created|组件创建后|组件实例已经完全创建，完成数据（data、props、computed）的初始化导入依赖项，可访问 data computed watch methods 上的方法和数据，但真实dom还没有生成，$el还不可用，若在此阶段进行DOM操作一定要放在Vue.nextTick()的回调函数中
beforeMount|挂载前|得不到具体的DOM元素，但vue挂载的根节点已经创建
mounted|挂载后|完成创建vm.$el，和双向绑定，可在此钩子操作DOM
beforeUpdate|组件数据更新前|数据驱动DOM，在数据更新后虽然没有立即更新数据，但是DOM中的数据会改变，这是vue双向数据绑定的作用。
update|组件数据更新后|数据更新后，完成虚拟DOM的重新渲染和打补丁
activited|keep-alive专属，组件被激活时调用|在使用vue-router时有时需要使用`<keep-alive></keep-alive>`来缓存组件状态，这个时候created钩子就不会被重复调用了
deadctivated|keep-alive专属，组件被销毁时调用|`<keep-alive></keep-alive>`组件被移除时使用
beforeDestory|组件销毁前调用|可做一些删除提示，如：您确定删除xx吗？
destoryed|组件销毁后调用|当前组件已被删除，销毁监听事件，组件、事件、子实例也被销毁。这时组件已经没有了，无法操作里面的任何东西了

## 第一次页面加载页面触发那些钩子？

依次是：beforeCreate-> created -> beforeMount -> mounted

## 父子组件生命周期执行顺序

* 父子组件依次：父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted
```
beforeCreate:我是父组件的钩子
created:我是父组件的钩子
beforeMount:我是父组件的钩子
beforeCreate:我是子组件1的钩子
created:我是子组件1的钩子
beforeMount:我是子组件1的钩子
mounted:我是子组件1的钩子
mounted:我是父组件的钩子
```

* 父子更新过程：父beforeUpdate->子beforeUpdate->子updated->父updated
* 父子销毁过程：父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
