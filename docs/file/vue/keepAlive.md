# keep-alive源码解读

> `<keep-alive>` 是 Vue 实现的一个内置组件，也就是说 Vue 源码不仅实现了一套组件化的机制，也实现了一些内置组件

### 源码位置 `src/core/components/keep-alive.js`

```typescript
export default {
  name: 'keep-alive',
  abstract: true,

  props: {
      // 只有匹配的组件会被缓存  白名单
    include: patternTypes,
      // 任何匹配的组件都不会被缓存  黑名单
    exclude: patternTypes,
      // 缓存的个数 ：当我们缓存很多的时候，会比较占用内存
    max: [String, Number]
  },

  methods: {
    cacheVNode() {
      const { cache, keys, vnodeToCache, keyToCache } = this
      // 如果有缓存组件
      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache
        // 把组件放在缓存中
        cache[keyToCache] = {
          name: getComponentName(componentOptions),
          tag,
          componentInstance,
        }
        // 组件的key放在key集合的最后一位
        keys.push(keyToCache)
        // 超过缓存数限制，将第一个删除
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
        this.vnodeToCache = null
      }
    }
  },

  created () {
    // 缓存的vnode
    this.cache = Object.create(null)
    // 缓存的虚拟dom的key集合
    this.keys = []
  },
    
  // 销毁cache中的vnode实例
  destroyed () {
    // 遍历销毁
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    this.cacheVNode()
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  updated () {
    this.cacheVNode()
  },
  // 执行 <keep-alive> 组件渲染的时候，就会执行到这个 render 函数
  render () {
    // 先获取到它的默认插槽，然后再获取到它的第一个子节点
    // <keep-alive> 只处理第一个子元素，一般和它搭配使用的有 component 动态组件或者是 router-view
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      // 如果配置了included 或者 excluded， 直接返回这个缓存组件的vnode
      if (
        // not included 
          /**
           * matches 方法判断了当前include 和 exclude 为了数组、字符串、正则表达式的情况
           *     这里也知道他的类型是 string | RegExp | Array<string>
           *     也就是说 我们平时传的类型可以为这三种
           */
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }
      // 否则走缓存
      const { cache, keys } = this
      // 定义缓存组件的key
      const key: ?string = vnode.key == null
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      // 如果命中缓存，则直接从缓存中拿 vnode 的组件实例
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // 并且重新调整了 key 的顺序放在了最后一个
        remove(keys, key)
        keys.push(key)
      } else {
        // 否则把 vnode 设置进缓存
        // 延迟设置缓存直到更新
        this.vnodeToCache = vnode
        this.keyToCache = key
      }

      // 渲染和执行被包裹组件的钩子函数需要用到
      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
```
### matches函数

```typescript
/**
 * 匹配 include 和 exclude 有没有keep-alive中包的这个组件名
 * @param string | RegExp | Array<string>
 * @return boolean
 * **/
function matches (pattern: string | RegExp | Array<string>, name: string): boolean {
    // 如果当前是传入的是数组
    if (Array.isArray(pattern)) {
        return pattern.indexOf(name) > -1
    // 传入的字符串，多个name用逗号分隔开
    } else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(name) > -1
    // 正则表达式
    } else if (isRegExp(pattern)) {
        return pattern.test(name)
    }
    return false
}
```
### pruneCache 新旧Vnode名对比，消除未匹配上的节点

```typescript
/**
 * 新旧Vnode名对比，消除未匹配上的节点
 * @param keepAliveInstance - 当前实例
 * @param filter - 判断函数
 * */
function pruneCache (keepAliveInstance: any, filter: Function) {
    const { cache, keys, _vnode } = keepAliveInstance
    for (const key in cache) {
        const entry: ?CacheEntry = cache[key]
        if (entry) {
            const name: ?string = entry.name
            // 如果新旧vnode 名称不一致
            if (name && !filter(name)) {
                pruneCacheEntry(cache, key, keys, _vnode)
            }
        }
    }
}

```


### pruneCacheEntry 销毁函数

```typescript
/**
 * 销毁组件函数
 * @param cache - 当前缓存vnode
 * @param key - 当前缓存vnode 的key
 * @param keys - 缓存key集合
 * @param current - 当前vnode
 * */
function pruneCacheEntry (
  cache: CacheEntryMap, 
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const entry: ?CacheEntry = cache[key]
  if (entry && (!current || entry.tag !== current.tag)) {
    // 执行组件的destory钩子函数
    entry.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
```
