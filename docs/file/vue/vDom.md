# 虚拟DOM

* 虚拟dom是实现vue和react的重要基石
* diff算法是vDom中的核心
* dom操作是非常消耗性能的
* js计算能力比较强，用js模拟DOM结构，计算最小变更来操作dom

#### js模拟DOM结构
```html
<div id="app" class="box">
    <p>vDom</p>
    <ul style="width: 20px">
        <li>a</li>    
    </ul>
</div>
```
```javascript
let vDom = {
    tag: 'div',
    props: {
        className: 'box',
        id: 'app'
    },
    children: [
        {
            tag: 'p',
            children: 'vDom'
        },
        {
            tag: 'ul',
            props: {
                style: 'width: 20px'
            },
            children: [
                {
                    tag: 'li',
                    children: 'a'
                }   
            ]
        }
    ]
}
```
## diff算法

### 树diff

#### 1. 时间复杂度o(n^3)
* 第一，遍历tree1，第二，遍历tree2
* 第三，排序
* 1000个节点，需计算1亿次

#### 2. 优化时间复杂度o(n)
* 只比较统一层级，不跨级比较
* tag不同，直接删掉重建，不再深度比较
* tag和key俩者相同，则认为相同节点，不再深度比较


## snabbdom
* 简单强大的vdom库
* vue参考它实现的vdom和diff算法
* git：<https://github.com/snabbdom/snabbdom>

```javascript
const container = document.getElementById("container");

const vnode = h("div#container.two.classes", { on: { click: someFn } }, [
  h("span", { style: { fontWeight: "bold" } }, "This is bold"),
  " and this is just normal text",
  h("a", { props: { href: "/foo" } }, "I'll take you places!"),
]);
// Patch到空的element中 – node节点放在一个dom中。
// 必须有个dom元素做关联，不然就不知道dom更新到哪
patch(container, vnode);

const newVnode = h(
  "div#container.two.classes",
  { on: { click: anotherEventHandler } },
  [
    h(
      "span",
      { style: { fontWeight: "normal", fontStyle: "italic" } },
      "This is now italic type"
    ),
    " and this is still just normal text",
    h("a", { props: { href: "/bar" } }, "I'll take you places!"),
  ]
);
// 第二次 `patch` 调用
patch(vnode, newVnode); // Snabbdom将旧视图更新 新视图的状态
```
* `h` 函数会返回一个vNode，vNode会返回一个对象，生成虚拟dom
```typescript
export function vnode(
  sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined): VNode {
  const key = data === undefined ? undefined : data.key;
  return { sel, data, children, text, elm, key };
}
```
* `patch` 函数diff算法对比
```typescript
// 第一个参数接收一个vnode或element,第二个参数接收vnode
return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node;
    const insertedVnodeQueue: VNodeQueue = [];
    // 执行pre生命周期
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
    // 如果第一个参数不是vnode，如patch(container, vnode);
    if (!isVnode(oldVnode)) {
      // 创建一个空的vnode，关联到这个dom元素
      oldVnode = emptyNodeAt(oldVnode);
    }
    // sameVnode:相同的vnode
    if (sameVnode(oldVnode, vnode)) {
      /**
        function sameVnode(vnode1: VNode, vnode2: VNode): boolean {
          // 如果都没有key，undefined === undefined 为true
          const isSameKey = vnode1.key === vnode2.key;  // key对比返回true
          const isSameIs = vnode1.data?.is === vnode2.data?.is; // 内容对比
          const isSameSel = vnode1.sel === vnode2.sel;      // 对比select
          return isSameSel && isSameKey && isSameIs; // 对比key、data、sel都相等
        }
      **/
      // vnode对比
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    // 不同的vnode，直接删掉重建
    } else {
      elm = oldVnode.elm!;
      parent = api.parentNode(elm) as Node;
      // 重建
      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i]);
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
}
```
* `patchVnode` 函数对比vnode更新
```typescript
function patchVnode(oldVnode: VNode,vnode: VNode,insertedVnodeQueue: VNodeQueue) {
    // 执行prepatch hook钩子函数
    const hook = vnode.data?.hook;
    hook?.prepatch?.(oldVnode, vnode);
    // 设置vnode.elm
    const elm = (vnode.elm = oldVnode.elm)!;
    // 旧vnode children
    const oldCh = oldVnode.children as VNode[];
    // 新vnode children
    const ch = vnode.children as VNode[];
    // 如果俩vnode相等，直接返回
    if (oldVnode === vnode) return;
    // 
    if (vnode.data !== undefined) {
      for (let i = 0; i < cbs.update.length; ++i)
        cbs.update[i](oldVnode, vnode);
      vnode.data.hook?.update?.(oldVnode, vnode);
    }
    // 如果vnode.text === undefined
    if (isUndef(vnode.text)) {
      // 新旧都有children，那就行更新 新的
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
       // 新children有，旧的无
      } else if (isDef(ch)) {
        // 清空text
        if (isDef(oldVnode.text)) api.setTextContent(elm, "");
        // 添加children
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
       // 旧children有，新的无
      } else if (isDef(oldCh)) {
        // 移除children
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        // 旧text有，新的无
      } else if (isDef(oldVnode.text)) {
        //设置行text
        api.setTextContent(elm, "");
      }
    // vnode.text !== undefined 
    } else if (oldVnode.text !== vnode.text) {
       // 移除旧children
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      // 设置行text
      api.setTextContent(elm, vnode.text!);
    }
    hook?.postpatch?.(oldVnode, vnode);
}
```
* `updateChildren` 函数，key节点对比核心
### Vue中的key的作用
* `key`是为Vue中的vnode标记的唯一id,通过这个key,我们的diff操作可以更准确、更快速
* diff算法的过程中,先会进行新旧节点的首尾交叉对比,当无法匹配的时候会用新节点的key与旧节点进行比对,然后超出差异
    * diff过程：oldCh和newCh各有两个头尾的变量StartIdx和EndIdx，它们的2个变量相互比较，一共有4种比较方式。如果4种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，变量会往中间靠，一旦StartIdx>EndIdx表明oldCh和newCh至少有一个已经遍历完了，就会结束比较,这四种比较方式就是首、尾、旧尾新头、旧头新尾.
## 模板编译
* js的with语法
* vue template complier将模板编译为render函数
* 执行render函数生成vnode
### with语法
* 使用with，能改变`{}`内自由变量的查找方式
* 将`{}`内的自由变量，当做obj的属性来查找
* 它打破了作用域的规则，慎用
```js
const obj = {a:'1', b: '2'}
console.log(obj.a) // 1
console.log(obj.b) // 2
console.log(obj.c) // undefined 
// with
with (obj) {
  console.log(a) // 1
  console.log(b) // 2
  console.log(c) // 报错 
}
```
#### vue-template-compiler模板编译插件
```javascript
npm i vue-template-compiler --save
```
```javascript
const compiler = require('vue-template-compiler')
// 插值
let template = `<p>{{msg}}</p>`
// with(this){return _c('p',[_v(_s(msg))])}
// h函数返回一个vnode
// _c函数同样也是返回一个vnode
// 三元判断
let template = `<p>{{flag ? msg : '无数据'}}</p>`
// with(this){return _c('p',[_v(_s(flag ? msg : '无数据'))])}
// 动态属性
let template = `<p class="box"><img :src="imgUrl"/></p>`
/*
with(this){
  return _c(
    'p',
    {
      staticClass:"box"
    },
    [
      _c(
        'img',
        {
          attrs:{
            "src":imgUrl
          }
        })
    ]
  )
}*/
// 事件
let template = `<p @click="clickHandler">按钮</p>`
// with(this){return _c('p',{on:{"click":clickHandler}},[_v("按钮")])}

// v-model
let template = `<input type="text" v-model="name"/>`
/* 
with(this){
  return _c(
    'input',
    {
      directives:[
        {
          name:"model",
          rawName:"v-model",
          value:(name),
          expression:"name"
        }
      ],
      attrs:{"type":"text"},
      domProps:{"value":(name)},
      on:{
        "input":function($event){
          if($event.target.composing)return;
          name=$event.target.value
        }
      }
    }
  )
}
*/
const res = compiler.compile(template)
console.log(res.render)
```
