# 基础类型

TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

## 布尔值

最基本的数据类型就是简单的 true/false 值，在JavaScript 和 TypeScript 里叫做 `boolean`（其它语言中也一样）。

```typescript
let isDone: boolean = false
```

## 数字

和 JavaScript 一样，TypeScript 里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript 还支持 ECMAScript 2015中引入的二进制和八进制字面量。

```typescript
let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100
let octalLiteral: number = 0o24
```

## 字符串

JavaScript 程序的另一项基本操作是处理网页或服务器端的文本数据。 像其它语言里一样，我们使用 `string` 表示文本数据类型。 和 JavaScript 一样，可以使用双引号（`"`）或单引号（`'`）表示字符串。

```typescript
let name: string = 'bob'
name = 'smith'
```

你还可以使用模版字符串，它可以定义多行文本和内嵌表达式。 这种字符串是被反引号包围（ ``` ` ```），并且以 `${ expr }` 这种形式嵌入表达式

```typescript
let name: string = `Yee`
let age: number = 37
let sentence: string = `Hello, my name is ${ name }.

I'll be ${ age + 1 } years old next month.`
```

这与下面定义 `sentence` 的方式效果相同：

```typescript
let sentence: string = 'Hello, my name is ' + name + '.\n\n' +
    'I\'ll be ' + (age + 1) + ' years old next month.'
```

## 数组

TypeScript 像 JavaScript 一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 `[]`，表示由此类型元素组成的一个数组：

```typescript
let list: number[] = [1, 2, 3]
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```typescript
let list: Array<number> = [1, 2, 3]
```

## 元祖 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 `string` 和 `number` 类型的元组。

```typescript
let x: [string, number]
x = ['hello', 10] // OK
x = [10, 'hello'] // Error
```

当访问一个已知索引的元素，会得到正确的类型：

```typescript
console.log(x[0].substr(1)) // OK
console.log(x[1].substr(1)) // Error, 'number' 不存在 'substr' 方法
```

当访问一个越界的元素，会使用联合类型替代：

```typescript
x[3] = 'world' // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()) // OK, 'string' 和 'number' 都有 toString

x[6] = true // Error, 布尔不是(string | number)类型
```

联合类型是高级主题，我们会在以后的章节里讨论它。

## 枚举

`enum` 类型是对 JavaScript 标准数据类型的一个补充。 像 C# 等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green
```

默认情况下，从 `0` 开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 `1` 开始编号：

```typescript
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green
```

或者，全部都采用手动赋值：

```typescript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为 2，但是不确定它映射到 Color 里的哪个名字，我们可以查找相应的名字：

```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2]

console.log(colorName)  // 显示'Green'因为上面代码里它的值是2
```

## any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 `any` 类型来标记这些变量：

```typescript
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false // 也可以是个 boolean
```

在对现有代码进行改写的时候，`any` 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。并且当你只知道一部分数据的类型时，`any` 类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

```typescript
let list: any[] = [1, true, 'free']

list[1] = 100
```

## void

某种程度上来说，`void` 类型像是与 `any` 类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```typescript
function warnUser(): void {
  console.log('This is my warning message')
}

```

声明一个 `void` 类型的变量没有什么大用，因为你只能为它赋予 `undefined` 和 `null`：

```typescript
let unusable: void = undefined
```

## null 和 undefined

TypeScript 里，`undefined` 和 `null` 两者各自有自己的类型分别叫做 `undefined` 和 `null`。 和 `void` 相似，它们的本身的类型用处不是很大：

```typescript
let u: undefined = undefined
let n: null = null
```

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。

然而，当你指定了 `--strictNullChecks` 标记，`null` 和 `undefined` 只能赋值给 `void` 和它们各自，这能避免 很多常见的问题。 也许在某处你想传入一个 `string` 或 `null` 或 `undefined`，你可以使用联合类型 `string | null | undefined`。 再次说明，稍后我们会介绍联合类型。

## never

`never` 类型表示的是那些永不存在的值的类型。 例如， `never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 `never` 类型，当它们被永不为真的类型保护所约束时。

`never` 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 `never` 的子类型或可以赋值给`never` 类型（除了 `never` 本身之外）。 即使 `any` 也不可以赋值给 `never`。

下面是一些返回 `never` 类型的函数：

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed")
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}
```

## object

`object` 表示非原始类型，也就是除 `number`，`string`，`boolean`，`symbol`，`null`或`undefined` 之外的类型。

使用 `object` 类型，就可以更好的表示像 `Object.create` 这样的 `API`。例如：

```typescript
declare function create(o: object | null): void

create({ prop: 0 }) // OK
create(null) // OK

create(42) // Error
create('string') // Error
create(false) // Error
create(undefined) // Error
```

## 类型断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript 会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法：

```typescript
let someValue: any = 'this is a string'

let strLength: number = (<string>someValue).length
```

另一个为 `as` 语法：

```typescript
let someValue: any = 'this is a string'

let strLength: number = (someValue as string).length
```

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在 TypeScript 里使用 JSX 时，只有 `as` 语法断言是被允许的。


# 类

对于传统的 JavaScript 程序我们会使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员使用这些语法就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 从 ECMAScript 2015，也就是 ES6 开始， JavaScript 程序员将能够使用基于类的面向对象的方式。 使用 TypeScript，我们允许开发者现在就使用这些特性，并且编译后的 JavaScript 可以在所有主流浏览器和平台上运行，而不需要等到下个 JavaScript 版本。

## 基本示例

下面看一个使用类的例子：

```typescript
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter('world')
```

如果你使用过 C# 或 Java，你会对这种语法非常熟悉。 我们声明一个 `Greeter` 类。这个类有 3 个成员：一个叫做 `greeting` 的属性，一个构造函数和一个 `greet` 方法。

你会注意到，我们在引用任何一个类成员的时候都用了 `this`。 它表示我们访问的是类的成员。

最后一行，我们使用 `new` 构造了 `Greeter` 类的一个实例。它会调用之前定义的构造函数，创建一个 `Greeter` 类型的新对象，并执行构造函数初始化它。

## 继承

在 TypeScript 里，我们可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

看下面的例子：

```typescript
class Animal {
  move(distance: number = 0) {
    console.log(`Animal moved ${distance}m.`)
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog()
dog.bark()
dog.move(10)
```

这个例子展示了最基本的继承：类从基类中继承了属性和方法。 这里，`Dog` 是一个 派生类，它派生自 `Animal` 基类，通过 `extends` 关键字。 派生类通常被称作*子类*，基类通常被称作*超类*。

因为 `Dog` 继承了 `Animal` 的功能，因此我们可以创建一个 `Dog` 的实例，它能够 `bark()` 和 `move()`。

下面我们来看个更加复杂的例子。

```typescript
class Animal {
  name: string
  constructor(name: string) { 
    this.name = name
  }
  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}

class Snake extends Animal {
  constructor(name: string) { 
    super(name)
  }
  move(distance: number = 5) {
    console.log('Slithering...')
    super.move(distance)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distance: number = 45) {
    console.log('Galloping...')
    super.move(distance)
  }
}

let sam = new Snake('Sammy')
let tom: Animal = new Horse('Tommy')

sam.move()
tom.move(34)
```

这个例子展示了一些上面没有提到的特性。 这一次，我们使用 `extends` 关键字创建了 Animal的两个子类：`Horse` 和 `Snake`。

与前一个例子的不同点是，派生类包含了一个构造函数，它 必须调用 `super()`，它会执行基类的构造函数。 而且，在构造函数里访问 `this` 的属性之前，我们 一定要调用 `super()`。 这个是 TypeScript 强制执行的一条重要规则。

这个例子演示了如何在子类里可以重写父类的方法。`Snake`类和 `Horse` 类都创建了 `move` 方法，它们重写了从 `Animal` 继承来的 `move` 方法，使得 `move` 方法根据不同的类而具有不同的功能。注意，即使 `tom` 被声明为 `Animal` 类型，但因为它的值是 `Horse`，调用 `tom.move(34)` 时，它会调用 `Horse` 里重写的方法。

```
Slithering...Sammy moved 5m.Galloping...Tommy moved 34m.
```

## 公共，私有与受保护的修饰符

### 默认为 public

在上面的例子里，我们可以自由的访问程序里定义的成员。 如果你对其它语言中的类比较了解，就会注意到我们在之前的代码里并没有使用 `public` 来做修饰；例如，C# 要求必须明确地使用 `public` 指定成员是可见的。 在 TypeScript 里，成员都默认为 `public`。

你也可以明确的将一个成员标记成 `public`。 我们可以用下面的方式来重写上面的 `Animal` 类：

```typescript
class Animal {  public name: string  public constructor(name: string) {    this.name = name  }  public move(distance: number) {    console.log(`${this.name} moved ${distance}m.`)  }}
```

### 理解 private

当成员被标记成 `private` 时，它就不能在声明它的类的外部访问。比如：

```typescript
class Animal {  private name: string  constructor(name: string) {     this.name = name  }}new Animal('Cat').name // 错误: 'name' 是私有的.
```

TypeScript 使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

然而，当我们比较带有 `private` 或 `protected` 成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 `private` 成员，那么只有当另外一个类型中也存在这样一个 `private` 成员，并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 `protected` 成员也使用这个规则。

下面来看一个例子，更好地说明了这一点：

```typescript
class Animal {  private name: string  constructor(name: string) {     this.name = name   }}class Rhino extends Animal {  constructor() {     super('Rhino')  }}class Employee {  private name: string  constructor(name: string) {     this.name = name  }}let animal = new Animal('Goat')let rhino = new Rhino()let employee = new Employee('Bob')animal = rhinoanimal = employee // 错误: Animal 与 Employee 不兼容.
```

这个例子中有 `Animal` 和 `Rhino` 两个类， `Rhino` 是 `Animal` 类的子类。 还有一个 `Employee` 类，其类型看上去与 `Animal` 是相同的。 我们创建了几个这些类的实例，并相互赋值来看看会发生什么。 因为 `Animal` 和 `Rhino` 共享了来自 `Animal` 里的私有成员定义 `private name: string`，因此它们是兼容的。然而 `Employee` 却不是这样。当把 `Employee` 赋值给 `Animal` 的时候，得到一个错误，说它们的类型不兼容。尽管 `Employee` 里也有一个私有成员 `name`，但它明显不是 `Animal` 里面定义的那个。

### 理解 protected

`protected` 修饰符与 `private` 修饰符的行为很相似，但有一点不同，`protected`成员在派生类中仍然可以访问。例如：

```typescript
class Person {  protected name: string  constructor(name: string) {     this.name = name   }}class Employee extends Person {  private department: string  constructor(name: string, department: string) {    super(name)    this.department = department  }    getElevatorPitch() {    return `Hello, my name is ${this.name} and I work in ${this.department}.`  }}let howard = new Employee('Howard', 'Sales')console.log(howard.getElevatorPitch())console.log(howard.name) // error
```

注意，我们不能在 `Person` 类外使用 `name`，但是我们仍然可以通过 `Employee` 类的实例方法访问，因为 `Employee` 是由 `Person`  派生而来的。

构造函数也可以被标记成 `protected`。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如：

```typescript
class Person {  protected name: string  protected constructor(name: string) {    this.name = name  }}// Employee 能够继承 Personclass Employee extends Person {  private department: string  constructor(name: string, department: string) {    super(name)    this.department = department  }  public getElevatorPitch() {    return `Hello, my name is ${this.name} and I work in ${this.department}.`  }}let howard = new Employee('Howard', 'Sales')let john = new Person('John') // 错误: 'Person' 的构造函数是被保护的.
```

## readonly 修饰符

你可以使用 `readonly` 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

```typescript
class Person {  readonly name: string  constructor(name: string) {    this.name = name  }}let john = new Person('John')john.name = 'peter'
```

### 参数属性

在上面的例子中，我们必须在 `Person` 类里定义一个只读成员 `name` 和一个参数为 `name` 的构造函数，并且立刻将 `name` 的值赋给 `this.name`，这种情况经常会遇到。 参数属性可以方便地让我们在一个地方定义并初始化一个成员。 下面的例子是对之前 `Person` 类的修改版，使用了参数属性：

```typescript
class Person {  constructor(readonly name: string) {  }}
```

注意看我们是如何舍弃参数 `name`，仅在构造函数里使用 `readonly name: string` 参数来创建和初始化 `name` 成员。 我们把声明和赋值合并至一处。

参数属性通过给构造函数参数前面添加一个访问限定符来声明。使用 `private` 限定一个参数属性会声明并初始化一个私有成员；对于 `public` 和 `protected` 来说也是一样。

## 存取器

`TypeScript` 支持通过 `getters/setters` 来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。

下面来看如何把一个简单的类改写成使用 `get` 和 `set`。 首先，我们从一个没有使用存取器的例子开始。

```typescript
class Employee {  fullName: string}let employee = new Employee()employee.fullName = 'Bob Smith'if (employee.fullName) {  console.log(employee.fullName)}
```

我们可以设置 `fullName`，因为它是 `public` 的，有时候当我们去修改它的时候触发一些额外逻辑，存取器就派上用场了。

下面这个版本里，我们先检查用户密码是否正确，然后再允许其修改员工信息。我们把对 `fullName` 的直接访问改成了可以检查密码的 `set` 方法。 我们也加了一个 `get` 方法，让上面的例子仍然可以工作。

```typescript
let passcode = 'secret passcode'class Employee {  private _fullName: string  get fullName(): string {    return this._fullName  }  set fullName(newName: string) {    if (passcode && passcode == 'secret passcode') {      this._fullName = newName    }    else {      console.log('Error: Unauthorized update of employee!')    }  }}let employee = new Employee()employee.fullName = 'Bob Smith'if (employee.fullName) {  console.log(employee.fullName)}
```

我们可以修改一下密码，来验证一下存取器是否是工作的。当密码不对时，会提示我们没有权限去修改员工。

对于存取器有下面几点需要注意的：

首先，存取器要求你将编译器设置为输出 ECMAScript 5 或更高。 不支持降级到 ECMAScript 3。其次，只带有 `get` 不带有 `set` 的存取器自动被推断为 `readonly`。这在从代码生成 `.d.ts` 文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。

## 静态属性

到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。 我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。 在这个例子里，我们使用 `static` 定义 `origin`，因为它是所有网格都会用到的属性。 每个实例想要访问这个属性的时候，都要在 `origin` 前面加上类名。 如同在实例属性上使用 `this.xxx` 来访问属性一样，这里我们使用 `Grid.xxx` 来访问静态属性。

```typescript
class Grid {  static origin = {x: 0, y: 0}  scale: number  constructor (scale: number) {    this.scale = scale  }  calculateDistanceFromOrigin(point: {x: number; y: number}) {    let xDist = point.x - Grid.origin.x    let yDist = point.y - Grid.origin.y    return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale  }}let grid1 = new Grid(1.0)  // 1x scalelet grid2 = new Grid(5.0)  // 5x scaleconsole.log(grid1.calculateDistanceFromOrigin({x: 3, y: 4}))console.log(grid2.calculateDistanceFromOrigin({x: 3, y: 4}))
```

## 抽象类

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。不同于接口，抽象类可以包含成员的实现细节。 `abstract` 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```typescript
abstract class Animal {  abstract makeSound(): void  move(): void {    console.log('roaming the earth...')  }}
```

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 `abstract` 关键字并且可以包含访问修饰符。

```typescript
abstract class Department {  name: string  constructor(name: string) {     this.name = name  }  printName(): void {    console.log('Department name: ' + this.name)  }  abstract printMeeting(): void // 必须在派生类中实现}class AccountingDepartment extends Department {  constructor() {    super('Accounting and Auditing') // 在派生类的构造函数中必须调用 super()  }  printMeeting(): void {    console.log('The Accounting Department meets each Monday at 10am.')  }  generateReports(): void {    console.log('Generating accounting reports...')  }}let department: Department // 允许创建一个对抽象类型的引用department = new Department() // 错误: 不能创建一个抽象类的实例department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值department.printName()department.printMeeting()department.generateReports() // 错误: 方法在声明的抽象类中不存在
```

## 高级技巧

### 构造函数

当你在 TypeScript 里声明了一个类的时候，实际上同时声明了很多东西。首先就是类的*实例*的类型。

```typescript
class Greeter {  static standardGreeting = 'Hello, there'  greeting: string  constructor(message: string) {    this.greeting = message  }  greet() {    return 'Hello, ' + this.greeting  }}let greeter: Greetergreeter = new Greeter('world')console.log(greeter.greet())
```

这里，我们写了 `let greeter: Greeter`，意思是 `Greeter` 类的实例的类型是 `Greeter`。 这对于用过其它面向对象语言的程序员来讲已经是老习惯了。

我们也创建了一个叫做*构造函数的值*。 这个函数会在我们使用 `new` 创建类实例的时候被调用。 下面我们来看看，上面的代码被编译成JavaScript后是什么样子的：

```javascript
var Greeter = /** @class */ (function () {  function Greeter(message) {    this.greeting = message;  }  Greeter.prototype.greet = function () {    return 'Hello, ' + this.greeting;  };  Greeter.standardGreeting = 'Hello, there';  return Greeter;}());var greeter;greeter = new Greeter('world');console.log(greeter.greet());
```

上面的代码里，`var Greeter` 将被构造函数赋值。 当我们调用 `new` 并执行了这个函数后，便会得到一个类的实例。这个构造函数也包含了类的所有静态属性。 换个角度说，我们可以认为类具有*实例部分*与*静态部分*这两个部分。

让我们稍微改写一下这个例子，看看它们之间的区别：

```typescript
class Greeter {  static standardGreeting = 'Hello, there'    greeting: string  constructor(message?: string) {    this.greeting = message  }  greet() {    if (this.greeting) {      return 'Hello, ' + this.greeting    } else {      return Greeter.standardGreeting    }  }}let greeter: Greetergreeter = new Greeter()console.log(greeter.greet())let greeterMaker: typeof Greeter = GreetergreeterMaker.standardGreeting = 'Hey there'let greeter2: Greeter = new greeterMaker()console.log(greeter2.greet())
```

这个例子里， `greeter1` 与之前看到的一样。 我们实例化 Greeter类，并使用这个对象。 与我们之前看到的一样。

再之后，我们直接使用类。 我们创建了一个叫做 `greeterMaker` 的变量。这个变量保存了这个类或者说保存了类构造函数。 然后我们使用 `typeof Greeter`，意思是取 `Greeter` 类的类型，而不是实例的类型。或者更确切的说，"告诉我 `Greeter` 标识符的类型"，也就是构造函数的类型。 这个类型包含了类的所有静态成员和构造函数。 之后，就和前面一样，我们在 `greeterMaker` 上使用 `new`，创建 `Greeter` 的实例。

### 把类当做接口使用

如上一节里所讲的，类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

```typescript
class Point {  x: number  y: number}interface Point3d extends Point {  z: number}let point3d: Point3d = {x: 1, y: 2, z: 3}
```

# 接口

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。它有时被称做“鸭式辨型法”或“结构性子类型化”。 在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

## 接口初探

下面通过一个简单示例来观察接口是如何工作的：

```typescript
function printLabel(labelledObj: { label: string }) {  console.log(labelledObj.label)}let myObj = { size: 10, label: 'Size 10 Object' }printLabel(myObj)
```

类型检查器会查看 `printLabel` 的调用。`printLabel` 有一个参数，并要求这个对象参数有一个名为 `label` 类型为 `string` 的属性。 需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，以及其类型是否匹配。 然而，有些时候 TypeScript  却并不会这么宽松，我们下面会稍做讲解。

下面我们重写上面的例子，这次使用接口来描述：必须包含一个`label` 属性且类型为 `string`：

```typescript
interface LabelledValue {  label: string}function printLabel(labelledObj: LabelledValue) {  console.log(labelledObj.label)}let myObj = {size: 10, label: 'Size 10 Object'}printLabel(myObj)
```

`LabelledValue` 接口就好比一个名字，用来描述上面例子里的结构。 它代表了有一个 `label` 属性且类型为`string` 的对象。 需要注意的是，我们在这里并不能像在其它语言里一样，说传给 `printLabel` 的对象实现了这个接口。我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。

还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

## 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。例如给函数传入的参数对象中只有部分属性赋值了。

```typescript
interface Square {  color: string,  area: number}interface SquareConfig {  color?: string  width?: number}function createSquare (config: SquareConfig): Square {  let newSquare = {color: 'white', area: 100}  if (config.color) {    newSquare.color = config.color  }  if (config.width) {    newSquare.area = config.width * config.width  }  return newSquare}let mySquare = createSquare({color: 'black'})
```

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 `?` 符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。 比如，我们故意将 `createSquare` 里的 `color` 属性名拼错，就会得到一个错误提示：

```typescript
interface Square {  color: string,  area: number}interface SquareConfig {   color?: string;   width?: number;} function createSquare(config: SquareConfig): Square {   let newSquare = {color: 'white', area: 100}   if (config.clor) {     // Error: 属性 'clor' 不存在于类型 'SquareConfig' 中     newSquare.color = config.clor   }   if (config.width) {     newSquare.area = config.width * config.width   }   return newSquare }  let mySquare = createSquare({color: 'black'})
```

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly` 来指定只读属性:

```typescript
interface Point {  readonly x: number  readonly y: number}
```

你可以通过赋值一个对象字面量来构造一个 `Point`。 赋值后，`x` 和 `y` 再也不能被改变了。

```typescript
let p1: Point = { x: 10, y: 20 }p1.x = 5 // error!
```

TypeScript 具有 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

```typescript
let a: number[] = [1, 2, 3, 4]let ro: ReadonlyArray<number> = aro[0] = 12 // error!ro.push(5) // error!ro.length = 100 // error!a = ro // error!
```

上面代码的最后一行，可以看到就算把整个 `ReadonlyArray` 赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：

```typescript
a = ro as number[]
```

### readonly vs const

最简单判断该用 `readonly` 还是 `const` 的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 `const`，若做为属性则使用 `readonly`。

## 额外的属性检查

我们在第一个例子里使用了接口，TypeScript 让我们传入 `{ size: number; label: string; }` 到仅期望得到 `{ label: string; }` 的函数里, 并且我们已经学过了可选属性。

然而，天真地将这两者结合的话就会像在 JavaScript 里那样搬起石头砸自己的脚。 比如，拿 `createSquare` 例子来说：

```typescript
interface SquareConfig {    color?: string;    width?: number;}function createSquare (config: SquareConfig): { color: string; area: number } {  let newSquare = {color: 'white', area: 100}  if (config.color) {    newSquare.color = config.color  }  if (config.width) {    newSquare.area = config.width * config.width  }  return newSquare}let mySquare = createSquare({ colour: 'red', width: 100 })
```

注意传入 `createSquare` 的参数拼写为 `colour` 而不是 `color`。 在 JavaScript 里，这会默默地失败。

你可能会争辩这个程序已经正确地类型化了，因为 `width` 属性是兼容的，不存在 `color` 属性，而且额外的 `colour` 属性是无意义的。

然而，TypeScript 会认为这段代码可能存在 bug。 对象字面量会被特殊对待而且会经过额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。

```typescript
// error: 'colour' 不存在于类型 'SquareConfig' 中let mySquare = createSquare({ colour: 'red', width: 100 })
```

绕开这些检查非常简单。 最简便的方法是使用类型断言：

```typescript
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig)
```

然而，最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。 如果 `SquareConfig` 带有上面定义的类型的 `color` 和 `width` 属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：

```typescript
interface SquareConfig {  color?: string  width?: number  [propName: string]: any}
```

我们稍后会讲到索引签名，但在这我们要表示的是`SquareConfig` 可以有任意数量的属性，并且只要它们不是 `color` 和 `width`，那么就无所谓它们的类型是什么。

还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为 `squareOptions` 不会经过额外属性检查，所以编译器不会报错。

```typescript
let squareOptions = { colour: 'red', width: 100 }let mySquare = createSquare(squareOptions)
```

要留意，在像上面一样的简单代码里，你可能不应该去绕开这些检查。 对于包含方法和内部状态的复杂对象字面量来讲，你可能需要使用这些技巧，但是大多数额外属性检查错误是真正的bug。也就是说你遇到了额外类型检查出的错误，你应该去审查一下你的类型声明。 在这里，如果支持传入 `color` 或 `colour` 属性到 `createSquare`，你应该修改 `SquareConfig` 定义来体现出这一点。


## 函数类型

接口能够描述 JavaScript 中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```typescript
interface SearchFunc {  (source: string, subString: string): boolean}
```

这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。

```typescript
let mySearch: SearchFuncmySearch = function(source: string, subString: string): boolean {  let result = source.search(subString);  return result > -1}
```

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 比如，我们使用下面的代码重写上面的例子：

```typescript
let mySearch: SearchFuncmySearch = function(src: string, sub: string): boolean {  let result = src.search(sub);  return result > -1}
```

函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。 如果你不想指定类型，TypeScript 的类型系统会推断出参数类型，因为函数直接赋值给了  `SearchFunc` 类型变量。 函数的返回值类型是通过其返回值推断出来的（此例是 `false` 和 `true`）。 如果让这个函数返回数字或字符串，类型检查器会警告我们函数的返回值类型与 `SearchFunc` 接口中的定义不匹配。

```typescript
let mySearch: SearchFuncmySearch = function(src, sub) {  let result = src.search(sub)  return result > -1}
```

## 可索引的类型

与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如 `a[10]` 或 `ageMap['daniel']`。 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。 让我们看一个例子：

```typescript
interface StringArray {  [index: number]: string}let myArray: StringArraymyArray = ['Bob', 'Fred']let myStr: string = myArray[0]
```

上面例子里，我们定义了 `StringArray` 接口，它具有索引签名。 这个索引签名表示了当用 `number` 去索引 `StringArray` 时会得到 `string` 类型的返回值。

TypeScript 支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用 `number` 来索引时，JavaScript 会将它转换成`string` 然后再去索引对象。 也就是说用 `100`（一个 `number`）去索引等同于使用`'100'`（一个 `string` ）去索引，因此两者需要保持一致。

```typescript
class Animal {  name: string}class Dog extends Animal {  breed: string}// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!interface NotOkay {  [x: number]: Animal  [x: string]: Dog}
```

字符串索引签名能够很好的描述 `dictionary` 模式，并且它们也会确保所有属性与其返回值类型相匹配。 因为字符串索引声明了 `obj.property` 和 `obj['property']` 两种形式都可以。 下面的例子里， `name` 的类型与字符串索引类型不匹配，所以类型检查器给出一个错误提示：

```typescript
interface NumberDictionary {  [index: string]: number;  length: number;    // 可以，length是number类型  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配}
```

最后，你可以将索引签名设置为只读，这样就防止了给索引赋值：

```typescript
interface ReadonlyStringArray {  readonly [index: number]: string;}let myArray: ReadonlyStringArray = ['Alice', 'Bob'];myArray[2] = 'Mallory'; // error!
```

## 类类型

### 实现接口

与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。

```typescript
interface ClockInterface {  currentTime: Date}class Clock implements ClockInterface {  currentTime: Date  constructor(h: number, m: number) { }}
```

你也可以在接口中描述一个方法，在类里实现它，如同下面的 `setTime` 方法一样：

```typescript
interface ClockInterface {  currentTime: Date  setTime(d: Date)}class Clock implements ClockInterface {  currentTime: Date  setTime(d: Date) {    this.currentTime = d  }  constructor(h: number, m: number) { }}
```

接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

### 类静态部分与实例部分的区别

当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

```typescript
interface ClockConstructor {  new (hour: number, minute: number)}// errorclass Clock implements ClockConstructor {  currentTime: Date  constructor(h: number, m: number) { }}
```

这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。`constructor` 存在于类的静态部分，所以不在检查的范围内。

看下面的例子，我们定义了两个接口，  `ClockConstructor` 为构造函数所用和 `ClockInterface` 为实例方法所用。 为了方便我们定义一个构造函数 `createClock`，它用传入的类型创建实例。

```typescript
interface ClockConstructor {  new (hour: number, minute: number): ClockInterface}interface ClockInterface {  tick()}function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {  return new ctor(hour, minute)}class DigitalClock implements ClockInterface {  constructor(h: number, m: number) { }  tick() {    console.log('beep beep')  }}class AnalogClock implements ClockInterface {  constructor(h: number, m: number) { }  tick() {    console.log('tick tock')  }}let digital = createClock(DigitalClock, 12, 17)let analog = createClock(AnalogClock, 7, 32)
```

因为 `createClock` 的第一个参数是 `ClockConstructor` 类型，在 `createClock(AnalogClock, 7, 32)` 里，会检查 `AnalogClock` 是否符合构造函数签名。


## 继承接口

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```typescript
interface Shape {  color: string}interface Square extends Shape {  sideLength: number}let square = {} as Squaresquare.color = 'blue'square.sideLength = 10
```

一个接口可以继承多个接口，创建出多个接口的合成接口。

```typescript
interface Shape {  color: string}interface PenStroke {  penWidth: number}interface Square extends Shape, PenStroke {  sideLength: number}let square = {} as Squaresquare.color = 'blue'square.sideLength = 10square.penWidth = 5.0
```

## 混合类型

先前我们提过，接口能够描述 JavaScript 里丰富的类型。 因为 JavaScript 其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。

```typescript
interface Counter {  (start: number): string  interval: number  reset(): void}function getCounter(): Counter {  let counter = (function (start: number) { }) as Counter  counter.interval = 123  counter.reset = function () { }  return counter}let c = getCounter()c(10)c.reset()c.interval = 5.0
```

在使用 JavaScript 第三方库的时候，你可能需要像上面那样去完整地定义类型。这门课要重构的 `axios` 库就是一个很好的例子。

## 接口继承类

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的 `private` 和 `protected` 成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。例：

```typescript
class Control {  private state: any}interface SelectableControl extends Control {  select(): void}class Button extends Control implements SelectableControl {  select() { }}class TextBox extends Control {  select() { }}// Error：“ImageC”类型缺少“state”属性。class ImageC implements SelectableControl {  select() { }}
```

在上面的例子里，`SelectableControl` 包含了 `Control` 的所有成员，包括私有成员 `state`。 因为 `state` 是私有成员，所以只能够是 `Control` 的子类们才能实现 `SelectableControl` 接口。 因为只有 `Control` 的子类才能够拥有一个声明于`Control` 的私有成员 `state`，这对私有成员的兼容性是必需的。

在 `Control` 类内部，是允许通过 `SelectableControl` 的实例来访问私有成员 `state` 的。 实际上，`SelectableControl` 接口和拥有 `select` 方法的 `Control` 类是一样的。`Button`和 `TextBox` 类是 `SelectableControl` 的子类（因为它们都继承自`Control` 并有 `select` 方法），但 `ImageC` 类并不是这样的。











