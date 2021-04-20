# Set&Map

## Set
* 是一种叫**集合**的数据结构
* 类似于数组，但成员的值是**唯一**的，没有重复。（构造函数，用来生成set数据结构）
* set里的数据类型不会被改变改变
### 用法
```js
// params可以使数组
const set = new Set(params)
```
```js
const set = new Set([1,2,3,'3',4,4])
console.log([...set]) // [1,2,3,'3',4]
```
### 属性
* size: 返回集合中所包含的元素的数量
```js
console.log(new Set([1,2,3,'3',4,4]).size) // 5
```
### 操作方法
方法|描述
--|:--|
add(value)|向集合中添加一个新的项
delete(value)|从集合中删除一个值
has(value)|如果值在集合中存在，返回ture, 否则返回false
clear()|移除集合中的所有项
```js
let set = new Set()
set.add(1)
set.add(2)
console.log(set) // {1,2}
set.delete(2)
console.log(set) // {1}
console.log(set.has(2)) // false
console.log(set.has(1)) // true
set.clear()
console.log(set) // {}
```
### 遍历方法

方法|描述
--|:--|
keys()|返回键名的遍历器
values()|返回键值的遍历器
entries()|返回键值对的遍历器
forEach()|使用回调函数遍历每个成员
```js
let set = new Set(['s','z','k'])
console.log(set.keys()) //{"s", "z", "k"}
console.log(set.values()) //{"s", "z", "k"}
console.log(set.entries()) //{"s" => "s", "z" => "z", "k" => "k"}
set.forEach(item => console.log(item)) //s z k
```
### 应用
```js
// 数组去重
let arr = [1, 1, 2, 3];
let unique = [... new Set(arr)]; // [1,2,3]
// 并集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
let union = [...new Set([...a, ...b])]; // [1,2,3,4]

// 交集
let intersect = [...new Set([...a].filter(x => b.has(x)))]; // [2,3]
// 差集
let difference = Array.from(new Set([...a].filter(x => !b.has(x)))); // [1]
```
## WeakSet
* 是一些对象值的集合, 并且其中的每个对象值都只能出现一次
* WeakSet 的出现主要`解决弱引用`对象存储的场景, 其结构与Set类似
    * 弱引用是指不能确保其引用的对象不会被垃圾回收器回收的引用，换句话说就是可能在任意时间被垃圾回收
* 与set相比：
    * WeakSet 只能是对象的集合，而不能是任何类型的任意值
    * WeakSet集合中对象的引用为弱引用
    * 如果没有其他的对WeakSet中对象的引用，那么这些对象会被当成垃圾回收掉。这也意味着WeakSet中没有存储当前对象的列表。正因为这样，WeakSet 是不可枚举的
      WeakSet 的属性跟操作方法与 Set 一致，不同的是 WeakSet 没有遍历方法
## Map
Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。一个Map对象在迭代时会根据对象中元素的插入顺序来进行 — 一个  for...of 循环在每次迭代后会返回一个形式为[key，value]的数组
* Map是一种叫做**字典**的数据结构
* 类似于对象，但'键'的返回不限于字符串，也可以是对象
* Map的数据结构提供了'值-值'的对应

### 用法
`new Map([iterable])` `Iterable` 可以是一个数组或者其他 iterable 对象,其元素为键值对(两个元素的数组，例如:` [[ 1, 'one' ],[ 2, 'two' ]]`)。每个键值对都会添加到新的map
```js
let map = new Map([['name','szk'], ['age','26']])
map.set({name:'k'},'szks')
console.log([...map])
/*[
    ["name", "szk"],
    ["age", "26"],
    [{{name: "k"}},'szks']
 ]
*/
```
### 属性
* size:  Map 结构的元素总数
```js
console.log(new Map([['name','szk'], ['age','26']]).size) // 2
```
### 操作方法
方法|描述
--|:--|
set(key, value)| 向 Map 中加入或更新键值对
get(key)|读取 key 对用的值，如果没有，返回 undefined
has(key)|个键是否在 Map 对象中，在返回 true 否则返回 false
delete(key)| 删除某个键，返回 true, 如果删除失败返回 false
clear():| 删除所有元素
```js
let map = new Map()
map.set('name','szk')
map.set('age','26')
console.log(map) // Map {"name" => "vuejs.cn", "age" => "18"}
console.log(map.get('name')) // szk
console.log(map.has('name')) // true
map.delete('name')  
console.log(map.has('name')) // false
console.log(map) //{"age" => "26"}
map.clear() // Map {} 
```
### 遍历方法

方法|描述
--|:--|
keys()|返回键名的遍历器
values()|返回键值的遍历器
entries()|返回所有成员的遍历器
forEach()|遍历 Map 的所有成员
```js
let map = new Map()
map.set('name','szk')
map.set('age','26')
console.log([...map.keys()]) //  ["name", "age"]
console.log([...map.values()]) //  ["szk", "26"]
console.log([...map.entries()]) // [["name", "age"], ["szk", "26"]]
map.forEach((value, key) => { console.log(key, value)})  // name szk  age 26
```
## WeakMap
* WeakMap 对象是一组键/值对的集合，其中的键是弱引用的
* 其键必`须是对象`，而值可以是任意的
* Map的区别：
    * Map 的键可以是任意类型，WeakMap 的键只能是对象类型
    * WeakMap 键名所指向的对象，不计入垃圾回收机制
    * WeakMap 的属性跟操作方法与 Map 一致，同 WeakSet 一样，因为是弱引用，所以也没有遍历器

### 总结
1. Set、Map、WeakSet、WeakMap、都是一种集合的数据结构
2. Set、WeakSet 是[值,值]的集合，且具有唯一性
3. Map 和 WeakMap 是一种[键,值]的集合，Map 的键可以是任意类型，WeakMap 的键只能是对像
4. Set 和 Map 有遍历方法，WeakSet 和 WeakMap 属于弱引用不可遍历
