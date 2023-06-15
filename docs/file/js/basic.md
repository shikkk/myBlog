
# js 基础知识

> JavaScript 是一种广泛使用的脚本语言，它是一种弱类型语言，这意味着在编写代码时，你不需要显式地声明变量的数据类型，JavaScript 引擎会自动推断变量的类型。它用于在 Web 页面上添加交互、动画和动态效果。


**JavaScript 和 java没有任何关系  相当于雷锋和雷峰塔**

## 基础知识目录

- [x] 变量和数据类型：JavaScript 中的变量可以存储各种类型的数据，包括数字、字符串、布尔值、对象等。变量可以使用 var、let 或 const 关键字声明。
- [x] 运算符：JavaScript 中有各种运算符，包括算术运算符、比较运算符、逻辑运算符等。
- [x] 控制流程语句：JavaScript 中有各种控制流程语句，包括条件语句（如 if...else）、循环语句（如 for、while）和跳转语句（如 break、continue）。
- [x] 函数：JavaScript 中的函数是一段可重用的代码块，可以接受参数并返回值。函数可以声明为具名函数或匿名函数，并可以通过函数表达式或函数声明来定义。
- [x] 数组和对象：学习数组和对象的定义和使用方法，以及如何在它们之间进行转换。
- [x] DOM操作：了解DOM模型，学习如何使用JavaScript来操纵页面元素，例如文本、样式和事件。
- [x] jQuery框架：学习jQuery框架的基本知识，包括选择器、事件处理程序和动画效果。
- [x] AJAX和JSON：学习如何使用AJAX来异步地加载数据，并将数据以JSON格式呈现。
## 变量和数据类型
> Js基础知识里，变量和数据类型是其中一个重要的组成部分。


### 变量
> 在 JavaScript 中，变量是用于存储值的容器。你可以使用 var、let 或 const 关键字来声明变量。其中，var 和 let 关键字都用来声明可变的变量，而 const 关键字用于声明不可变的常量。


```javascript
var ht = "华腾";
let ht = "华腾"
const ht = "华腾"
```

#### var
> var 可以重复声明，会变量提升

```javascript
// 重复声明
var ht = 'huaten'
var ht = '华腾'
console.log(ht) // 华腾


// 变量提升

var ht
console.log(ht) // 华腾
ht = '华腾'

// 没有块级作用域

for(var i = 0; i< 3; i++) {
  console.log(i)
}

console.log(i)
```
#### let / const
> 不可以重复声明，不会会变量提升

```javascript
// 重复声明
let ht = 'huaten'
let ht = '华腾'
console.log(ht) 

// Uncaught SyntaxError: Identifier 'ht' has already been declared


// 变量提升

let ht
console.log(ht) // Uncaught SyntaxError: Identifier 'ht' has already been declared
ht = '华腾'


// 没有块级作用域

for(let i = 0; i< 3; i++) {
  console.log(i)
}

console.log(i)


let ht = 'ht'
ht = '华腾'
console.log(ht)
// 华腾


const ht = 'ht'
ht = '华腾'
// TypeError: Assignment to constant variable.
```

### 数据类型
> Js 中有多种数据类型以下是一些常见的 JavaScript 数据类型

| 内存 | 数据类别 | 数据类型 | 描述 |
| --- | --- | --- | --- |
| 栈内存 | 基本数据类型 | String，Number，Boolean，null，undefined，Symbol | 特征大小固定，体积轻量，相对简单 |
| 堆内存 | 引用数据类型 | Object，Array，Function | 特征占用空间大，且大小不固定 |



- 字符串：用于表示文本数据。例如，以下代码声明了一个名为 "ht" 的变量并将其赋值为字符串 "huaten"：
```javascript
var ht = 'huaten'
```

- 数字：用于表示数值，包括整数和浮点数。例如，以下代码声明了一个名为 "age" 的变量并将其赋值为数字 25：
```javascript
var age = 18;
```

- 布尔值：表示真或假。布尔值只有两个可能的值：true（真）和 false（假）。例如，以下代码声明了一个名为 "isAge18" 的变量并将其赋值为布尔值 true：
```javascript
var isAge18 = true
```

- 对象：用于表示复杂的数据结构，可以包含属性和方法。例如，以下代码创建了一个名为 "person" 的对象，并为其添加了名为 "name" 和 "job" 的属性：
```javascript
var person = {
	name: 'szk',
  job: '前端'
}
```

- 数组用于表示一组数据，可以包含任何类型的数据。例如，以下代码创建了一个名为 "numbers" 的数组，并将其初始化为包含数字 1、2、3 的数组：
```javascript
var numbers = [1, 2, 3]
```

- 函数
```javascript
var ht = function() {}
```

### 为何是弱类型语言
> 它编写代码时，你不需要显式地声明变量的数据类型，JavaScript 引擎会自动推断变量的类型。

- 以下是 JavaScript 是弱类型语言的一些特点：
    - 灵活性：JavaScript 是一种灵活的语言，允许变量在运行时动态改变它们的类型。这种灵活性使得 JavaScript 在编写动态应用程序时非常有用，因为它可以处理各种数据类型和数据结构
    - 简化开发流程：JavaScript 中的弱类型特性简化了开发流程。开发人员不必担心变量的数据类型，因为 JavaScript 引擎会自动进行类型转换。这减少了代码中的样板代码并提高了代码的可读性
    - 快速迭代：JavaScript 的弱类型特性使得开发人员能够更快地迭代和测试代码。该特性允许开发人员在不修改代码结构的情况下更改变量的类型，这样可以更快地测试和调整代码
- 潜在的问题
    - 由于 JavaScript 引擎会自动进行类型转换，因此可能会导致一些意外的行为。因此，在编写 JavaScript 代码时，最好使用类型安全的编程技术，并进行适当的测试和验证。


## 运算符和表达式
> js中的运算符用于执行不同类型的操作，如算术运算、比较、逻辑运算等


### 算术运算符及表达式
> 算术运算符用于执行数学计算。以下是一些常见的算术运算符：

1. +：加法
2. -：减法
3. *：乘法
4. /：除法
5. %：求余数
6. **：指数运算
7. ++：自增
8. --：自减

```javascript
var a = 10;
var b = 5;

console.log(a + b); // 15
console.log(a - b); // 5
console.log(a * b); // 50
console.log(a / b); // 2
console.log(a % b); // 0
console.log(a ** 2); // 100
console.log(++a); // 11
console.log(--b); // 4
```
### 比较运算符及表达式
> 比较运算符用于比较两个值，返回布尔值true或false。以下是一些常见的比较运算符：

1. `==` ：等于（值相等，类型可以不同）
2. `===`：全等（值和类型都相等）
3. `!=`：不等于（值不等，类型可以不同）
4. `!==`：不全等（值或类型不同）
5. `>`：大于
6. `<`：小于
7. `>=`：大于等于
8. `<=`：小于等于
```javascript
var a = 10;
var b = '10';

console.log(a == b); // true
console.log(a === b); // false
console.log(a != b); // false
console.log(a !== b); // true
console.log(a > b); // false
console.log(a < b); // false
console.log(a >= b); // true
console.log(a <= b); // true
```

### 逻辑运算符及表达式
> 逻辑运算符用于执行布尔逻辑运算。以下是一些常见的逻辑运算符：

1. &&：逻辑与（AND）
2. ||：逻辑或（OR）
3. !：逻辑非（NOT）
```javascript
var a = true;
var b = false;

console.log(a && b); // false
console.log(a || b); // true
console.log(!a); // false
console.log(!b); // true
```

## 控制流程语句
> js中的控制流程语句用于控制代码的执行顺序，包括条件语句、循环语句和跳转语句


### 条件语句：if语句和switch语句

- if语句用于根据某个条件执行不同的代码块。
```javascript
let num = 10;
if (num > 0) {
  console.log("正数");
} else if (num < 0) {
  console.log("负数");
} else {
  console.log("值为0");
}

```

- switch语句用于根据不同的情况执行不同的代码块。
```javascript
let day = 3;
switch (day) {
  case 1:
    console.log("周一");
    break;
  case 2:
    console.log("周二");
    break;
  case 3:
    console.log("周三");
    break;
  default:
    console.log("无效日期");
}
```

### 循环语句：for循环、while循环和do-while循环。

- for循环用于重复执行指定的代码块。
```javascript
for (let i = 0; i < 5; i++) {
  console.log("当前的i是 " + i);
}

```

- while循环用于在满足某个条件时重复执行代码块。
```javascript
let i = 0;
while (i < 5) {
  console.log("当前的i是  " + i);
  i++;
}

```

- do-while循环类似于while循环，但它会先执行一次代码块，然后再检查条件是否满足。
```javascript
let i = 0;
do {
  console.log("当前的i是" + i);
  i++;
} while (i < 5);
```

### 跳转语句：break语句和continue语句。

- break语句用于立即退出循环。
```javascript
for (let i = 0; i < 5; i++) {
  if (i === 3) {
    break;
  }
  console.log("当前的i是 " + i);
}
```

- continue语句用于跳过当前循环的剩余代码，并进入下一次循环。
```javascript
for (let i = 0; i < 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log("The value of i is " + i);
}
```

## 函数
### 声明函数的几种方式及传参调用
#### 函数声明
> 函数声明是通过`function`关键字来定义函数的


```javascript
function functionName(params) {
  // 函数体
}



function add(a, b) {
  return a + b;
}

console.log(add(1, 2)); // 输出3
```

#### 函数表达式
> 函数表达式是将函数赋值给一个变量或常量


```javascript
const functionName = function (params) {
  // 函数体
};


const add = function (a, b) {
  return a + b;
};

console.log(add(3, 1)); // 输出4

```

#### 箭头函数（es6新增）
> 箭头函数是ES6新增的一种函数定义方式，它使用箭头操作符 `=>`来定义函数

```javascript
const functionName = (params) => {
  // 函数体
};


const add = (a, b) => {
  return a + b;
};

console.log(add(2, 4)); // 输出6
```

#### 自执行函数
> 自执行函数是在定义之后立即执行的函数，也称为立即调用函数表达式


- 这两种方式都会创建一个匿名函数并立即调用它。
- 自执行函数的主要优点是可以在不污染全局命名空间的情况下运行代码。由于自执行函数中定义的变量和函数只存在于自己的作用域中，因此不会与其他代码中的同名变量或函数发生冲突。
- 自执行函数还可以用来创建模块化的代码结构，通过返回一个对象或函数来暴露公共接口，使得其他代码可以访问其中的功能。

```javascript
(function() {
  // 函数体
})();


(function foo() {
  // 函数体
}());
```
## 数组及对象
> js中的数组和对象都是数据类型，用于存储和组织数据。

### 数组
> 数组是一组有序的数据集合，每个元素通过一个索引来访问，索引从0开始。可以用中括号语法定义一个数组


```javascript
let arr = []
let arr = new Array()

let myArray = [1, 2, 3, 4, 5];
let myArrayInfo = [
  {
  	key: value1
	},
  {
  	key: value2
	}
];

```

- 常用方法
```javascript
// push()后增  接收任意参数，并将它们添加到数组末尾，返回数组最新的长度

let arr = [1, 2]
arr.push(3)
// console.log(arr);  [1, 2, 3]


// unshift()前增 unshift()方法接收任意参数，并将它们添加到数组开头，返回数组最新的长度

let arr = ['k']
arr.unshift('s', 'z')  
console.log(arr); //arr ['s', 'z', 'k']

// pop()  删除数组最后一项，返回被删除的项
let arr = ["s", "z", "k"];
arr.pop();
console.log(arr); // ["s", "z"]

// shift()方法删除数组第一项，返回被删除的项
let arr = ["s", "z", "k"];
arr.shift();
console.log(arr); // ["z", "k"]

// forEach() 遍历方法 对数组每一项都运行传入的函数 遍历
let arr = [1, 2, 3];
arr.forEach((item, index, array) => {
  console.log(item); // 1 2 3
  console.log(index); // 0 1 2
  console.log(array); // [1, 2, 3];
});

 
```

### 对象
> 对象是一组无序的键值对的集合，每个键值对称为一个属性或者字段。可以用花括号语法定义一个对象


```javascript
let obj = {}
let obj = new Object()

let myObj = {
  name: 'zk',
  job: 'web'
};

// 可以通过点操作符或者方括号语法来访问对象属性

console.log(myObj.name); // "zk"
console.log(myObj["job"]); // web

```

- 常用方法
```javascript
let myObj = {
  name: 'zk',
  job: 'web'
};

// delete 删除方法
delete myObj.name
console.log(myObj) // {job: 'web'}

// Object.keys() 获取所有属性名组成的数组
console.log(Object.keys(myObj)) // ['name', 'job']

// Object.values() 获取所有value组成的数组
console.log(Object.keys(myObj)) // ['zk', 'web']

// 遍历
for(let i in myObj) {
  console.log(i) // name job
  console.log(myObj[i]) // zk web
}
```

### 二者相互转化

#### 对象转数组
> Object.entries()方法将对象转换为数组，其中每个元素是键值对的数组

```javascript
let myObj = {name: "zk", job: 'web'};
let myArray = Object.entries(myObj);
console.log(myArray); // [["name", "zk"], ["job", web]]
```
#### 数组转对象
> 使用Object.fromEntries()方法可以将数组转换为对象

```javascript
let myArray = [["name", "zk"], ["job", 'web']];
let myObj = Object.fromEntries(myArray);
console.log(myObj); // {name: "zk", job: "web"}
```

## DOM操作
> DOM（文档对象模型）是一种用于访问和操作HTML或XML文档的编程接口。Js可以通过DOM来操纵页面上的元素，包括文本、样式和事件

> 在DOM中，页面被表示为节点树。每个节点都是一个对象，可以包含其他节点，如元素节点、文本节点和属性节点等。这些节点可以通过js代码来访问和操作


### 获取页面元素
#### getElementById：通过元素的id属性获取元素。
```javascript
var element = document.getElementById('app');
```
#### getElementsByClassName：通过类名获取元素，返回一个类数组对象。
```javascript
var elements = document.getElementsByClassName('example');
```
#### getElementsByTagName：通过标签名获取元素，返回一个类数组对象。
```javascript
var elements = document.getElementsByTagName('div');

```
#### querySelector：通过CSS选择器获取匹配的第一个元素，返回一个元素对象。
```javascript
var element = document.querySelector('.example');
```
#### querySelectorAll：通过CSS选择器获取匹配的所有元素，返回一个类数组对象。
```javascript
var elements = document.querySelectorAll('.example');
```

#### parentNode、previousSibling、nextSibling、firstChild、lastChild
```javascript
var element = document.getElementById('example');
// 获取父节点
var parent = element.parentNode;
// 前一个兄弟节点
var previous = element.previousSibling;
// 后一个一个兄弟节点
var next = element.nextSibling;
// 第一个兄弟节点
var firstChild = element.firstChild;
// 最后一个一个兄弟节点
var lastChild = element.lastChild;

```

### 修改页面元素
```javascript
let myElement = document.getElementById("myElementId");

// 修改元素内容： 可以使用innerHTML属性来修改元素的内容
myElement.innerHTML = "新的文本内容";

// 修改元素样式： 可以使用style属性来修改元素的CSS样式
myElement.style.backgroundColor = "red";

// 添加 可以使用createElement()方法创建新元素，使用appendChild()方法将其添加到页面上
let newElement = document.createElement("div");
newElement.innerHTML = "新的元素";
document.body.appendChild(newElement);

// 删除元素
document.body.removeChild(newElement);

// 监听事件： 可以使用addEventListener()方法来监听事件
myElement.addEventListener("click", function() {
  console.log("元素被点击了");
});
```

## Jquery 框架
> jQuery是一种流行的JavaScript库，它简化了DOM操作、事件处理和动画效果等任务


### 获取页面元素
#### $('#id')：通过元素的id属性获取元素。
```javascript
var element = $("#app")
```
#### $(className)：通过类名获取元素，返回一个类数组对象。
```javascript
var elements = $('.example');
```
#### $(tag)：通过标签名获取元素，返回一个类数组对象。
```javascript
var elements = $('div');

```
#### $("[name='myName']") 属性选择器。
```javascript
var element = $("input[name='myName']");
```

#### parentNode、previousSibling、nextSibling、firstChild、lastChild
```javascript
var element = $('#example');
// 获取直接父节点
var parent = element.parent();
// 获取祖先节点
var parents = element.parents();
// 前一个兄弟节点
var previous = element.prev();
// 后一个一个兄弟节点
var next = element.next();
// 所有兄弟节点
var siblings = element.siblings()
// 获取子节点
var children = $(element).children()

```

### 修改页面元素
```javascript
let myElement = $("#myElementId");

// 修改元素内容： 可以使用html、text()属性来修改元素的内容
myElement.html()
myElement.text()

// 修改元素样式： 可以使用style属性来修改元素的CSS样式
myElement.css("color" , "red");
myElement.css({ "color":"white" ,"font-size":"20px"});

// 添加 
var newElement = $('<div></div>');
myElement.append(newElement);

// 删除元素
myElement.remove();

// 监听事件： 直接点击事件
$("button").click(function(){
  
});

// 监听点击事件
$(document).on('click', "button", function() {
  // 处理程序代码
});
```

### 动画效果
```javascript
let myElement = $("#myElementId");
// 显示隐藏
myElement.show()
myElement.hide()

// 淡入淡出元素
myElement.fadeIn();
myElement.fadeOut();

// 上下滑动元素
myElement.slideUp();
myElement.slideDown();

// 自定义动画效果
myElement.animate({
  opacity: '0.5',
  width: '50%'
}, 1000);
```

## AJAX
> javaScript 的 AJAX（Asynchronous JavaScript and XML）技术允许您在不重新加载整个页面的情况下与服务器进行通信，从而可以异步地加载数据


### 原生js ajax 与服务端交互
```javascript
// 要使用 AJAX，首先需要创建一个 XMLHttpRequest 对象。这个对象用于与服务器交换数据。
var xhr = new XMLHttpRequest();

使用 open() 方法来设置请求的类型、URL 以及是否异步执行
xhr.open('GET', './testServer.json', true);

// 监听 readystatechange 事件。
// n当请求的状态发生变化时，会触发这个事件。
// 我们还需要检查 readyState 和 status 属性以确保请求已经完成且成功
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 当请求成功时，我们可以使用 JSON.parse() 方法将 JSON 字符串解析为 JavaScript 对象
    var data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};

// 使用 send() 方法发送请求
xhr.send();
```

### jq ajax 与服务端交互
```javascript
$.ajax({
  url: './testServer.json',
  method: 'GET',
  dataType: 'json',
  success: function(data) {
    // 处理响应数据
    console.log(data);
  },
  error: function(xhr, status, error) {
    // 处理错误
    console.error(error);
  }
});

```
