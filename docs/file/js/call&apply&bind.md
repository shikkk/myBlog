# call、apply、bind

## 概念及异同点
1. call、apply、bind都是改变函数this指向的
2. call、apply改变this的同时会把函数执行了
3. bind只负责改变this指向，其他不做任何操作
4. call入参是逐个入参；apply入参是以数组的形式入参

## 手写call、apply、bind

### call方法实现
call表现出的特性有俩点
1. call可以被所有函数继承的，所以call方法应该被定义在Function.prototype上
2. 改变 this 的指向，将 this 绑到第一个入参指定的的对象上去
* 简单实现
```javascript
Function.prototype.myCall = function (context, ...args) {
    //把函数挂到目标对象上（这里的 this 就是我们要改造的的那个函数）
    context.func = this
    //执行函数
    context.func(...args)
    // 删除 step1 中挂到目标对象上的函数，把目标对象”完璧归赵”
    delete context.func
}
```
* 完整实现
```javascript
 Function.prototype.myCall = function(context, ...args) { 
      context = context || window // 默认为 window 
      const key = Symbol('callKey') // 避免覆盖 ctx 原有的属性 
      context[key] = this 
      const result = context[key](...args) // 函数返回值 
      delete context[key] 
      return result 
    }
```

### apply方法实现

```javascript
 Function.prototype.myApply = function(context, arr) { 
      if (!(arr instanceof Array)) return // 参数类型检验 
      context = context || window // 默认为 window 
      const key = Symbol('applyKey') // 避免覆盖 ctx 原有的属性 
      context[key] = this 
      const result = context[key](...arr) // 函数返回值 
      delete context[key] 
      return result 
    }
```

### bind方法实现
```javascript
Function.prototype.myBind = function(context, ...rest) { 
      context = context || window 
      const fn = this 
      return function() { 
        return fn.myCall(context, ...rest) 
      } 
    }
```
* 函数简单调用
```javascript
let me = {
      name: 'zk'
}
function showName() {
  console.log(this.name)
}
showName.myCall(me)
```

