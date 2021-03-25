# Promise

## promise是什么

promise对象是一个代理对象。他接受传入得executor(执行器)作为入参，允许你把异步任务的成功和失败分别绑定在对应的处理方法上
* 一个promise实例有以下三种状态：

状态|命名|作用
:--|:--|:--|
pending|进行中|Promise 实例创建后的一个初始态
fulfilled|成功完成|这是在执行器中调用 resolve 后，达成的状态
rejected|操作失败、被拒绝|这是在执行器中调用 reject后，达成的状态

* promise实例的状态是可以改变的，但它只允许被改变一次。
    + 当实例状态从pending切换为rejected后，就无法切换到fulfilled，反之同理
    + 当状态切换为resolved 时，会触发其对应then方法传入的onfulfilled函数
    + 当状态切换为rejected  时，会触发其对应then方法传入的onrejected 函数
## promise常见方法

### 1. Promise.all(iterable)
这个方法返回一个新的promise对象，这个promise对象在iterable参数对象里所有的promise对象都成功的时候才触发成功，一旦有一个promise对象失败
则立即触发该promise对象的失败
```javascript
let p1 = Promise.resolve('1');
let p2 = '2';
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "3");
}); 
Promise.all([p1, p2, p3]).then(arr => { 
  console.log(arr); //  ["1", "2", "3"]
});
```
如果其中一个promise失败，会立即触发该对象的失败
```javascript
let p1 = Promise.resolve('1');
let p2 = Promise.reject('2');
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "3");
}); 
Promise.all([p1, p2, p3]).then(arr => { 
  console.log(arr); //  Uncaught (in promise) 2
});
```
### 2. Promise.race(iterable)
race就是赛跑的意思，意思就是说，Promise.race([p1, p2])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

```javascript
let p1 = new Promise(function(resolve, reject) { 
    setTimeout(reject, 1000, "1"); 
});
let p2 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 500, "2"); 
});

Promise.race([p1, p2]).then(function(value) {
  console.log(value); //  "2"   因为2返回的最早
});
```
### 3.Promise.reject(reason)
返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法
### 4.Promise.resolve(value)
* 返回一个 Promise 对象，但是这个对象的状态由你传入的value决定  
    * 如果传入的是一个带有 then 方法的对象（我们称为 thenable 对象），返回的Promise对象的最终状态由then方法执行决定
    * 返回的 Promise 对象状态为 fulfilled，同时这里的 value 会作为 then 方法中指定的 onfulfilled 的入参

#### 值穿透问题
then 方法的入参只能是函数，别的都不行
```javascript
Promise.resolve(1)
  .then(Promise.resolve(2))
  .then(3)
  .then()
  .then(console.log)   // 打印出1
```
## promise作用
promise是js中进行异步编程的新解决方案，解决回调地狱，从语法上它是一个构造函数

