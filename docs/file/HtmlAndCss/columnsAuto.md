# 俩栏、三栏自适应布局

## 俩栏

左边固定，右边自适应  
如下：
<img :src="$withBase('/images/css/auto2.jpg')">
```html
<div class="box">
    <div class="left"></div>
    <div class="right"></div>
</div>
```
#### 1. float+margin

```css
.box{
    /*清除浮动 添加bfc*/
    overflow: hidden; 
}
.left{
    float: left;
    width: 200px;
    height: 400px;
    background-color: coral;
}
.right{
    margin-left: 200px;
    height: 400px;
    background-color: cornflowerblue;
}
```
#### 2. flex布局

```css
.box{
    display: flex;
    /* align-items: flex-start  子元素宽高自适应*/
}
.left{
    width: 200px;
    height: 300px;
    background-color: coral;
}
.right{
    flex: 1;
    background-color: cornflowerblue;
}
```
* flex容器的一个默认属性值: `align-items: stretch`;
* 这个属性导致了列等高的效果(设置一个子元素的高度，就够了)
* 为了让两个盒子高度自动设置 align-items: flex-start 

## 三栏布局
左右固定，中间自适应  
如下：
<img :src="$withBase('/images/css/auto3.jpg')">

#### 1. flex
```html
<div class="box">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
</div>
```
```css
.box{
    display: flex;
  }
  .left,.right{
    width: 200px;
    height: 400px;
    /*flex-shrink: 0 左右宽度不伸缩*/
    flex-shrink: 0;
    /* flex: 0 0 auto; */
    background-color: cornflowerblue;
  }
  .center{
    /* width: 100%; */
    flex: 1;
    background-color: coral;
  }
```
#### 2. 两边使用 float，中间使用 margin

中间div放在最下面
```html
<div class="box">
    <div class="left"></div>
    <div class="right"></div>
    <div class="center"></div>
</div>
```
```css
.box{
    overflow: hidden;
}
.left, .right{
    height: 400px;
    width: 200px;
    background-color: coral;
}
.left{
    float: left;
}
.right{
    float: right;
}
.center{
    margin-left: 200px;
    margin-right: 200px;
    height: 400px;
    background-color: cornflowerblue;
}
```
