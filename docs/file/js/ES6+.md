# ES6+

## 1.let/const
* let/const不存在变量提升
```js
console.log(name)  // 报错  const也如此
let name = 'zk'
```
* 当我们用 let/const 声明变量时，变量会被绑定到块作用域上，块作用域外访问不到里面的变量，var不会
```js
{
  let me = 'zk'
  console.log(me) // 'zk'
}
console.log(me) // 报错
// var
{
  var me = 'zk'
  console.log(me) // 'zk'
}
console.log(me) // 'zk' 
```
* const声明变量，必须在声明同时初始化，不然会报错
```js
const me   // 报错
```
* const声明变量赋值后，值不可被改变。<font color=red>引用类型的属性值可以被改变</font>
```js
const me = 'zk'
me = 'szk'  // 报错

// 引用类型的属性值可以被改变
const me = {
  name: 'zk'
}
me.name = 'szk'
```
* const 是用来被声明常量的;它的内存空间在哪个位置，这一点一开始就锁死了，不要尝试把 const 定义的变量指向新的内存空间
### 暂时性死区
```js
var me = 'xiuyan';

{
	me = 'bear';
	let me;
}
// 这段代码会报错
```
**ES6 中有明确的规定：如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。假如我们尝试在声明前去使用这类变量，就会报错**
* 当我们进入当前作用域时，let 或者 const 声明的变量已经存在了——它们只是不允许被获取而已。要想获取它们，必须得等到代码执行到声明处

## 2.对象和数组解构
解构是一种新的提取数据的模式，这种模式能够从对象或数组里有针对性的拿到我们需要的值

### 2.1 数组解构
```js
const [a, b, c] = [1, 2, 3]
console.log(a, b, c) // 1, 2, 3
const [a,, c] = [1, 2, 3]
console.log(a, c) // 1, 3
```

### 2.2 对象结构
```js
const stu = {
  name: 'Bob',
  age: 24
}
const { name, age } = stu
console.log(name) // Bob
```
### 提取高度嵌套的对象里的指定属性
```js
const school = {
   classes: {
      stu: {
         name: 'Bob',
         age: 24,
      }
   }
}
const { classes: { stu: { name } }} = school
console.log(name) // Bob
```
### 解构同时重命名
如果你接到的需求是给 name 起个新名字，采取 属性名：新变量名 这种形式就好
```js
const { classes: { stu: { name: newName } }} = school
console.log(newName)  // 'Bob'
```
## 3.扩展运算符...
### 3.1 对象扩展运算符
对象中的扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
```js
const me = { 
  name: 'zk',
  age: 27
}
const meCopy = { ...me }
console.log(meCopy) // {name: "zk", age: 24}
```
这里的...me等价于下面写法

```js
Object.assign({}, me)
```
### 3.2 数组扩展运算符
数组中，扩展运算符可以将数组转化为用逗号分隔的参数序列
```js
console.log(...[1, 2, 3]) // 1 2 3 不是字符串
// 另一个
function mutiple(x, y) {
  return x*y
}
const arr = [2, 3]
mutiple(...arr) // 6
// 合并数组
const arr = [...[1, 2, 3], ...[4, 5]]
console.log(arr) // [1,2,3,4,5]
```
## 4.类数组转换
* 类数组定义：
    * 它必须为一个对象
    * 它有length属性
```js
const book = {
  name: 'zk',
  age: 27,
  length: 3 
} // 这是一个类数组对象
```
### 4.1转换类数组方法
```js
const arrayLike = {0: 's', 1: 'z', 2: 'k', length: 3 }
```
有以下三种方法：
1. Array原型上的slice方法 这个方法如果不传参数的话会返回原数组的一个拷贝
```javascript
const arr = Array.prototype.slice.call(arrayLike)
console.log(arr) // ["s", "z", "k"]
```
2. Array.from方法，专门转化类数组的
```javascript
console.log(Array.from(arrayLike)) // ["s", "z", "k"]
```
3. 扩展运算符...
可以把类数组转化为数组，前提是这个类数组对象上部署了遍历器接口
* arguments是类数组对象，有遍历器接口
```javascript
function demo() {
  console.log([...arguments])
}
demo(1, 2, 3, 4) // [1, 2, 3, 4]
```
## 5.模板语言
```javascript
let name = 'zk',age = 17
console.log(`我是${name}，年龄${age}`)  // 我是zk，年龄27
```
模板字符串有俩个优势
1. 在模板字符串中，空格、缩进、换行都会被保留
2. 模板字符串完全支持“运算”式的表达式，可以在${}里完成一些计算
```javascript
function add(a, b) {
  const total = `${a} + ${b} = ${a+b}`
  console.log(total)
}
add(1, 2) // 输出 '1 + 2 = 3'
```
## 6.判断方法
### 6.1 includes：判断字符串与子串的包含关系
```javascript
const str = 'shi zhi kai'
str.includes('kai') // true
```
### 6.2 startsWith：判断字符串是否以某个/某串字符开头
```javascript
const str = 'shi zhi kai'
str.startsWith('kai') // false
str.startsWith('shi') // true
```
### 6.3 endsWith：判断字符串是否以某个/某串字符结尾
```javascript
const str = 'shi zhi kai'
str.endsWith('kai') // true
str.endsWith('shi') // false
```
### 6.4 repeat：自动重复
```javascript
const str = 'shi'
console.log(str.repeat(3)) //shishishi
```
## 7.箭头函数
```javascript
function getValue() {
  console.log('222')
}
// 变为箭头函数
const getValue = () => {
  console.log('222')
}
```
* 箭头函数和普通函数的区别
    1. 箭头函数是匿名函数，不能作为构造函数，不能使用`new`
    2. 箭头函数不绑定`arguments`,而是...运算符接收
    3. 箭头函数的this指向上下文（window）任何方法都改变不了他的指向（如call，bind，apply），普通函数指向调用他的对象
    4. 箭头函数没有原型属性
## 8.Set$Map
 [Set$Map详细解读](./set&map.md)
