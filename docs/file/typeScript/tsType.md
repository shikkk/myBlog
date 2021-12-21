# 类型定义


## 1. react hooks

```ts
// 1. useState
const [State, setState] = React.useState<boolean>(false)

setState: React.Dispatch<React.SetStateAction<boolean>>

```

## 2. 复杂类型

```ts
// 1. 函数

fun: (value:  number | null | undefined) => boolean // 有返回值
fun: (value:  number | null | undefined) => void // 无返回值

// 2. 多个自由扩展
interface ImorePorps {
    [key: string]: any;
}


```

## 3. HTLM、css 类型

```ts
// 1. css样式 React.CSSProperties
{
    padding: 4,
    borderWidth: 2,
    borderStyle: 'solid',

} as React.CSSProperties

// 2. html标签 HTMLDivElement
const ref = React.useRef<HTMLDivElement>(null)

// 3. 鼠标键盘事件
domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;

// 4. 虚拟dom
React.ReactNode

// 5. 
```