# 实现map方法
## for循环实现
```javascript
Array.prototype.myMap = function(fn, thisArgs) {
  // 判断一下传入fn是不是函数
  if (Object.prototype.toString.call(fn) !== '[object Function]') {
      throw ('fn is not function')
  }
  let resArr = []
  let curArr = this // 当前调用myMap方法的数组
  for (let i = 0; i < curArr.length; i++) {
    resArr[i] = fn.call(thisArgs, curArr[i], i, curArr)
  }
  return resArr
}
```

## 利用reduce实现
```javascript
Array.prototype.myMap = function(cb, thisArgs) {
  let thisArgs = thisArgs || null
  return this.reduce((prev,cur,index,arr)=>{
    prev.push(cb.call(thisArgs,cur, index, arr))
    return prev
  },[])
}
```
* 方法调用
```javascript
let arr = [1, 2, 3]
let arr1 = arr.myMap((item, index, arr) => {
  return item*2
})
console.log(arr1) // [2, 4, 6]
```
