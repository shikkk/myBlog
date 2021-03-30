# CSS选择器的权重

选择器|例子|权值
--|:--|:--|
!important|.a{color:red!important}|infinity
内联样式|`<h1 style="font-size:12px;color:#000;">zk</h1>`|1000
id|#id|0100
class|.class|0010
伪类|.class:hover|0010
属性|[type='text']|0010
标签|p|0001
伪元素|p:last-child|0001
通配符、子选择器、相邻选择器|*、>、+|0000

