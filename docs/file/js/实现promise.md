# 实现promise

## 自定义promise函数模块

```javascript
(function(window) {
/**
  promise构造函数
  executor:执行函数（同步）
**/
  function Promise(executor) {
    // 把promise对象保存起来
    let _this = this
    this.status = 'pending' // 设置promise对象的初始状态，为pending
    this.data = undefined   // 设置一个用于存储结果数据的属性
    this.callback = []  // 每个元素的结构：{onResolved(){}, onRejected(){}}

    function resolve (value) {
      // 如果当前状态不是pending，直接结束
      if(_this.status !== 'pending') return

      // 改变成功状态resolved
      _this.status = 'resolved'
      // 保存value数据
      _this.data = value
      // 如果有待执行的callback函数，立即异步执行回调函数onResolved
      if (_this.callback.length > 0) {
        setTimeout(() => {  // 放入队列，执行所有的成功回调
          _this.callback.forEach(cbsObj => {
          cbsObj.onResolved(value)
        });
        }, 0);
      }
    
    }   
    function reject (reason) {
      // 如果当前状态不是pending，直接结束
      if(_this.status !== 'pending') return

      // 改变成功状态rejected
      _this.status = 'rejected'
      // 保存value数据
      _this.data = reason
      // 如果有待执行的callback函数，立即异步执行回调函数onRejected
      if (_this.callback.length > 0) {
        setTimeout(() => {  // 放入队列，执行所有的成功回调
          _this.callback.forEach(cbsObj => {
          cbsObj.onRejected(reason)
        });
        }, 0);
      }
    }

    // 立即同步执行executor
    try {
      executor(resolve, reject)
    } catch (error) { // 如果执行器抛出异常，我们要捕获异常,promise对象变为rejected状态
      // 异常调用reject方法
      reject(error)
    }
  }
  /**
  Promise原型对象的then()
  指定成功和失败的回调函数
  返回一个新的promise对象
  **/
  Promise.prototype.then = function(onResolved, onRejected){
    let _this = this

    // 指定默认的失败回调（实现错误、异常传透的关键点）
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    // 向后传递成功的value
    onResolved = typeof onResolved === 'function' ? onResolved : value => value

    // 返回一个新的promise对象
    return new Promise ((resolve, reject) => {

      // 调用回调函数处理
      function handle(cb) {
        /**
         * 1.如果抛出异常，return的promise就会失败，reason就是error
         * 2.如果回调函数返回不是promise，return的promise就会成功，value就是返回值
         * 3.如果回调函数返回是promise，return的promise结果就是这个promise
         * **/
          try {
          const result = cb(_this.data)
          // 3.如果回调函数返回是promise，return的promise结果就是这个promise
          if (result instanceof Promise) {
            result.then(
              value => resolve(value), // 当result成功时，让return的promise也成功
              reason => reject(reason) // 当result失败时，让return的promise也失败
            )
            // result.then(resolve, reject)  简写
          } else {
            // 2.如果回调函数返回不是promise，return的promise就会成功，value就是返回值
            resolve(result)
          }
        } catch (error) {
          // 1.如果抛出异常，return的promise就会失败，reason就是error
          reject(error)
        }
      }

      if (_this.status === 'pending') {
        // 前状态为pending，将回调函数保存起来
        _this.callback.push({
          onResolved () {
            handle(onResolved)
          },
          onRejected () {
            handle(onRejected)
          }
        })
      } else if (_this.status === 'resolved') {
        setTimeout(() => {
          handle(onResolved)
        });

      } else {  // 'rejected'
        setTimeout(() => {
          handle(onRejected)
        });
      }
    })
  }
  /**
  Promise原型对象的catch()
  指定失败的回调函数
  返回一个新的promise对象
  **/
  Promise.prototype.catch = function(onRejected){
    return this.then(undefined, onRejected)
  }
  /**
  Promise函数对象的resolve()
  返回一个成功的promise
  **/
  Promise.resolve = function (value) {
    // 返回一个成功、或失败的promise
    return new Promise ((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else {  // value不是promise，promise变为成功，数据是value
        resolve(value)
      }          
    })
  }
  /**
  Promise函数对象的reject()
  返回一个指定reason的失败promise
  **/
  Promise.reject = function (reason) {
    // 返回一个失败的promise
    return new Promise ((resolve, reject) => {
      reject(reason)
    })
  }
  /**
  Promise函数对象的all()
  返回一个promise，只有当所有promise都成功才成功，否则只有一个失败的就失败
  **/
  Promise.all = function (promises) {
    const values = new Array(promises.length)  // 用来保存所有成功value的数组
    let resolveCount = 0   // 用来保存成功的promise
    return new Promise ((resolve, reject) => {
      // 遍历每个promise的结果
      promises.forEach((item, index) => {
        Promise.resolve(item).then(
          value => {
            resolveCount++
            values[index] = value
            // 如果全部成功了，将return的promise改变成功
            if(resolveCount === promises.length) {
              resolve(values)
            }
          },
          reason => { //只要一个失败，return的promise就失败
            reject(reason)
          }
        )
      })
    })
  }
  /**
  Promise函数对象的race()
  返回一个promise，其结果由第一个完成的promise决定
  **/
  Promise.race = function (promises) {
    return new Promise ((resolve, reject) => {
      // 遍历每个promise的结果
      promises.forEach((item, index) => {
        Promise.resolve(item).then(
          value => {  // 一旦有成功的，将return变为成功
            resolve(value)
          },
          reason => { //一旦有失败的，将return变为失败
            reject(reason)
          }
        )
      })
    })

  }
  // 向外暴露Promise函数
  window.Promise = Promise
})(window)

```

## class实现

```javascript
(function(window) {
/**
  promise构造函数
  executor:执行函数（同步）
**/
  class Promise{
    constructor(executor){
      // 把promise对象保存起来
      let _this = this
      this.status = 'pending' // 设置promise对象的初始状态，为pending
      this.data = undefined   // 设置一个用于存储结果数据的属性
      this.callback = []  // 每个元素的结构：{onResolved(){}, onRejected(){}}

      function resolve (value) {
        // 如果当前状态不是pending，直接结束
        if(_this.status !== 'pending') return

        // 改变成功状态resolved
        _this.status = 'resolved'
        // 保存value数据
        _this.data = value
        // 如果有待执行的callback函数，立即异步执行回调函数onResolved
        if (_this.callback.length > 0) {
          setTimeout(() => {  // 放入队列，执行所有的成功回调
            _this.callback.forEach(cbsObj => {
            cbsObj.onResolved(value)
          });
          }, 0);
        }
      
      }   
      function reject (reason) {
        // 如果当前状态不是pending，直接结束
        if(_this.status !== 'pending') return

        // 改变成功状态rejected
        _this.status = 'rejected'
        // 保存value数据
        _this.data = reason
        // 如果有待执行的callback函数，立即异步执行回调函数onRejected
        if (_this.callback.length > 0) {
          setTimeout(() => {  // 放入队列，执行所有的成功回调
            _this.callback.forEach(cbsObj => {
            cbsObj.onRejected(reason)
          });
          }, 0);
        }
      }
      // 立即同步执行executor
      try {
        executor(resolve, reject)
      } catch (error) { // 如果执行器抛出异常，我们要捕获异常,promise对象变为rejected状态
        // 异常调用reject方法
        reject(error)
      }
    }

    /**
    Promise原型对象的then()
    指定成功和失败的回调函数
    返回一个新的promise对象
    **/
    then(onResolved, onRejected){
      let _this = this

      // 指定默认的失败回调（实现错误、异常传透的关键点）
      onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
      // 向后传递成功的value
      onResolved = typeof onResolved === 'function' ? onResolved : value => value

      // 返回一个新的promise对象
      return new Promise ((resolve, reject) => {

        // 调用回调函数处理
        function handle(cb) {
          /**
           * 1.如果抛出异常，return的promise就会失败，reason就是error
           * 2.如果回调函数返回不是promise，return的promise就会成功，value就是返回值
           * 3.如果回调函数返回是promise，return的promise结果就是这个promise
           * **/
            try {
            const result = cb(_this.data)
            // 3.如果回调函数返回是promise，return的promise结果就是这个promise
            if (result instanceof Promise) {
              result.then(
                value => resolve(value), // 当result成功时，让return的promise也成功
                reason => reject(reason) // 当result失败时，让return的promise也失败
              )
              // result.then(resolve, reject)  简写
            } else {
              // 2.如果回调函数返回不是promise，return的promise就会成功，value就是返回值
              resolve(result)
            }
          } catch (error) {
            // 1.如果抛出异常，return的promise就会失败，reason就是error
            reject(error)
          }
        }

        if (_this.status === 'pending') {
          // 前状态为pending，将回调函数保存起来
          _this.callback.push({
            onResolved () {
              handle(onResolved)
            },
            onRejected () {
              handle(onRejected)
            }
          })
        } else if (_this.status === 'resolved') {
          setTimeout(() => {
            handle(onResolved)
          });

        } else {  // 'rejected'
          setTimeout(() => {
            handle(onRejected)
          });
        }
      })
    }
    /**
    Promise原型对象的catch()
    指定失败的回调函数
    返回一个新的promise对象
    **/
    catch(onRejected){
      return this.then(undefined, onRejected)
    }
    /**
    Promise函数对象的resolve()
    返回一个成功的promise
    **/
    // 给类对象添加方法 static
    static resolve = function (value) {
      // 返回一个成功、或失败的promise
      return new Promise ((resolve, reject) => {
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else {  // value不是promise，promise变为成功，数据是value
          resolve(value)
        }          
      })
    }
    /**
    Promise函数对象的reject()
    返回一个指定reason的失败promise
    **/
    static reject = function (reason) {
      // 返回一个失败的promise
      return new Promise ((resolve, reject) => {
        reject(reason)
      })
    }
     /**
    Promise函数对象的all()
    返回一个promise，只有当所有promise都成功才成功，否则只有一个失败的就失败
    **/
    static all = function (promises) {
      const values = new Array(promises.length)  // 用来保存所有成功value的数组
      let resolveCount = 0   // 用来保存成功的promise
      return new Promise ((resolve, reject) => {
        // 遍历每个promise的结果
        promises.forEach((item, index) => {
          Promise.resolve(item).then(
            value => {
              resolveCount++
              values[index] = value
              // 如果全部成功了，将return的promise改变成功
              if(resolveCount === promises.length) {
                resolve(values)
              }
            },
            reason => { //只要一个失败，return的promise就失败
              reject(reason)
            }
          )
        })
      })
    }
    /**
    Promise函数对象的race()
    返回一个promise，其结果由第一个完成的promise决定
    **/
    static race = function (promises) {
      return new Promise ((resolve, reject) => {
        // 遍历每个promise的结果
        promises.forEach((item, index) => {
          Promise.resolve(item).then(
            value => {  // 一旦有成功的，将return变为成功
              resolve(value)
            },
            reason => { //一旦有失败的，将return变为失败
              reject(reason)
            }
          )
        })
      })
    }
  }
  // 向外暴露Promise函数
  window.Promise = Promise
})(window)
```
