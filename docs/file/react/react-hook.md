# react-hook

## 创建hook项目
创建react ts模板项目
```
npm install -g create-react-app
create-react-app my-react-app --template typescript
```
## hook
### hook由来
1. Hook 出现之前，组件之间复用状态逻辑很难，解决方案（HOC、Render Props）都需要重新组织组件结构， 且代码难以理解。
2. 在React DevTools 中观察过 React 应用，你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。
3. 组件维护越来越复杂，譬如事件监听逻辑要在不同的生命周期中绑定和解绑，复杂的页面componentDidMount包涵很多逻辑，代码阅读性变得很差。
4. class组件中的this难以理解，且class 不能很好的压缩，并且会使热重载出现不稳定的情况
### hook解决了什么
1. 避免地狱式嵌套，可读性提高。
2. 函数式组件，比class更容易理解。
3. class组件生命周期太多太复杂，使函数组件存在状态。
4. 解决HOC和Render Props的缺点。
5. UI 和 逻辑更容易分离。
## 1.useState
函数组件状态  
#### 作用：返回一个状态以及能修改这个状态的setter，在其他语言称为元组（tuple），一旦mount之后只能通过这个setter修改这个状态。
`const [state, setState] = useState(initialState)`; state为变量，setState 修改 state值的方法， setState也是异步执行。  
`class this.setState`更新是state是合并， useState中setState是替换

```tsx
function App() {
  const [num, setNum] = useState(0)
  return (
    <div className="App">
      {num}
      <button onClick={()=>setNum(num + 1)}>按钮</button>
    </div>
  );
}
```
## 2.useEffect
#### 作用：处理函数组件中的副作用，如异步操作、延迟操作等，可以替代Class Component的`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`等生命周期
```js
useEffect(()  =>  {// Async Action}, ?[dependencies]); // 第二参数非必填
```
```jsx
function Effect() {
  const [data, setData] = useState('szk');
  useEffect(() => {
    console.log("useEffect");
  });
  useEffect(() => {
    console.log("useEffect2");
  }, []);
  return (
    <div>
      {(() => {
        console.log("render");
        return null;
      })()}
      <p>data: {JSON.stringify(data)}</p>
    </div>
  );
}
```
* 执行结果：render => useEffect => useEffect2
* 结论：
    * useEffect 是在render之后生效执行并有先后顺序。
    * useEffect 内部执行是异步的
    * 可依赖`[]`可以实现类似`componentDidMount`的作用
```jsx
import React, { useEffect } from "react";

function Effect() {
  useEffect(() => {
    console.log('useEffect1');
    const timeId = setTimeout(() => {
      console.log('useEffect1-setTimeout-2000');
    }, 2000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);
  return (
    <div>
      {(() => {
        console.log('render');
        return null;
      })()}
      <p>demo4</p>
    </div>
  );
}
export default Effect;
```
#### effect的回调函数返回一个匿名函数，相当于`componentUnMount`的钩子函数，一般是remove eventLisenter， clear timeId等，主要是组件卸载后防止内存泄漏。

## 3.useContext
#### 跨组件共享数据的钩子函数  
```jsx
const value = useContext(MyContext);
// MyContext 为 context 对象（React.createContext 的返回值） 
// useContext 返回MyContext的返回值。
// 当前的 context 值由上层组件中距离当前组件最近的<MyContext.Provider> 的 value prop 决定。
```
```jsx
import React, { useContext, useState } from 'react';
const MyContext = React.createContext();
function ContextDemo() {
  const [value, setValue] = useState('init');
  console.log('ContextDemo');
  return (
    <div>
      {(() => {
        console.log('render');
        return null;
      })()}
      <button onClick={() => {
        setValue(`${Date.now()}_newValue`)
      }}>
        改变value
      </button>
      <MyContext.Provider value={value}>
        <Child1 />
        <Child2 />
      </MyContext.Provider>
    </div>
  );
}

function Child1() {
  const value = useContext(MyContext);
  console.log('Child1-value', value);
  return <div>Child1-value: {value}</div>;
}

function Child2() {
  console.log('Child2')
  return <div>Child2</div>;
}

export default ContextDemo;
```
```
useContextDemo.tsx:6  ContextDemo
useContextDemo.tsx:10 render
useContextDemo.tsx:28 Child1-value init
useContextDemo.tsx:33 Child2
useContextDemo.tsx:6  ContextDemo
useContextDemo.tsx:10 render
useContextDemo.tsx:28 Child1-value 1621766774622_newValue
useContextDemo.tsx:33 Child2
```
* useContext 的组件总会在 context 值变化时重新渲染， 所以`<MyContext.Provider>`包裹的越多，层级越深，性能会造成影响
* `<MyContext.Provider>` 的 value 发生变化时候， 包裹的组件无论是否订阅content value，所有组件都会从新渲染。
* child2 不应该rerender, 如何避免不必要的render? 使用`React.memo`优化。
```jsx
const Child2 = React.memo(() => {
  return <div>Child2</div>;
})
```
## 4.useRef
```jsx
const refContainer = useRef(initialValue);
```
* useRef 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。
* useRef 可以保存任何可变的值。其类似于在 class 中使用实例字段的方式
* useRef 可以存储那些不需要引起页面重新渲染的数据。
* 如果你刻意地想要从某些异步回调中读取 /最新的/ state，你可以用 一个 ref 来保存它，修改它，并从中读取。
```tsx
import React, {useState, useRef} from 'react'

const RefDemo = () => {
  const [data, setData] = useState('');
  
  const iptRef = useRef(null)
  
  const iptChange = () => {
    const iptVal = iptRef.current!['value']
    setData(iptVal)
  }
  return (
    <div>
      <p>{data}</p>
      <input type="text" ref={iptRef} onChange={iptChange}/>
    </div>
  );
}

export default RefDemo
```
## 5.useReducer
```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```
* reducer就是一个只能通过action将state从一个过程转换成另一个过程的纯函数;
* useReducer就是一种通过(state,action) => newState的过程，和redux工作方式一样。
* 数据流： dispatch(action) => reducer更新state => 返回更新后的state

```jsx
import React, {useReducer} from 'react'
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}
const ReducerDemo = () => {
  const initialState = {count: 0};
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

export default ReducerDemo
```
#### 官方推荐以下场景需要`useReducer`更佳：
* state 逻辑较复杂且包含多个子值， 可以集中处理。
* 下一个 state 依赖于之前的 state 。
* 想更稳定的构建自动化测试用例。
* 想深层级修改子组件的一些状态，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为 你可以向子组件传递 dispatch 而不是回调函数  。
* 使用reducer有助于将读取与写入分开

## 6.useCallback
```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
// 返回一个 memoized 回调函数。
```
* useCallback将返回一个记忆的回调版本，仅在其中一个依赖项已更改时才更改。
* 当将回调传递给依赖于引用相等性的优化子组件以防止不必要的渲染时，此方法很有用。
* 使用回调函数作为参数传递，每次render函数都会变化，也会导致子组件rerender， useCallback可以优化rerender。

疑问：如何优化子组件不必要的渲染？ useMemo

## 7.useMemo
```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
* 返回一个 memoized 值，和useCallback一样，当依赖项发生变化，才会重新计算 memoized 的值。
* useMemo和useCallback不同之处是：**它允许你将 memoized 应用于任何值类型（不仅仅是函数）**
* useMemo 会在render 前执行。
* 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。
* useMemo用于返回memoize,防止每次render时大计算量带来的开销。
* 使用useMemo优化需谨慎， 因为优化本身也带来了计算，大多数时候，你不需要考虑去优化不必要的重新渲染。

#### [参考-react hook](https://zh-hans.reactjs.org/docs/hooks-intro.html)