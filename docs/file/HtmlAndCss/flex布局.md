# flex布局

```css
.box{
    width: 500px;
    height: 500px;
    background: seagreen;
    display: flex;
    /* 1、flex-direction: row;   主轴方向
        row：默认  从左到右
        row-reverse:从右到左   反转
        column:从上到下
        column-reverse:从下到上  反转
        
        2、justify-content: ;决定主轴item的对其方式
        flex-start:默认 item从左到右
        flex-end：item 从右到左   不反转 
        center:item 相对于父元素居中对其
        space-between: 三等分  左右距离为0
        space-around:三等分   左右靠边距离为中间item距离的一半
        
        space-evenly:平均三等分

        3、align-items  在交叉轴的对其方式
        flex-end:y轴靠低对其
        flex-end:y轴靠低对其
        flex-starty轴靠上对其;
        center :y轴居中对其
        baseline:基线对其

        4、flex-wrap: 控制item换行
        nowrap：默认  不换行
        wrap 换行
        wrap-reverse 换行  反转
        5、flex-flow   flex-direction|| flex-warp 组合使用

        6、align-content 多行交叉轴布局
        */ 
}
.item{
    width: 100px;
    height: 100px;
    background: seashell;
    text-align: center;
    line-height:100px ;
    font-size: 24px;
    border: 1px solid #000000;
    /* 1、order: 任意数值  数值越小越靠前排   默认值为0
        2、align-self: 覆盖父元素的align-items设置的值;
        flex-end:y轴靠低对其
        flex-end:y轴靠低对其
        flex-starty轴靠上对其;
        center :y轴居中对其
        baseline:基线对其
    3、flex-grow 数值 ：item宽度设置
    4、flex-shrink 数值  收缩
    5、flex-basis  //200px   设置item主轴宽度
    6、flex  flex-grow|| flex-shrink || flex-basis 组合使用
        无单位数值：代表   flex-grow 
        有单位数值  代表  flex-basis
        */
}
.item1{
    order: 2;
    /* align-self: ; */
    flex-basis:200px ;
}
.item2{
    order: 1;
}
.item3{
    order: 2;
}
```
```html
<div class="box">
    <div class="item item1">1</div>
    <div class="item item2" >2</div>
    <div class="item item3">3</div>
    <!-- <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div> -->
</div>
```