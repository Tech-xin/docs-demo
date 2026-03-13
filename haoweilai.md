# 1.24好未来前端面经

## 面试官人还挺好的，整个精神面貌让我感觉我是被接纳的是能适应前端的，尽管拖着疲惫的身躯早晨九点面试，但是面试完之后好像没有那么内耗了，有了信心，继续加油！



###  

整理一下面经吧：

1.http和https的区别

2.时间复杂度和空间复杂度

时间复杂度：算法运行次数随输入规模变化的趋势

空间复杂度：算法运行额外占用的内存空间

3.对着简历问了项目，虚拟列表

4.问了CSS垂直居中有哪些方式

5.localstorage、sessionstorage和cookie

6.问到AI应用

剩下的好像记不清了，但是继续加油！今天烟草让AI面了，28号试一试！

##面经复盘：

##### 1.https和http的区别

http超文本传输协议，明文传输，容易被中间人例如黑客进行窃听或者篡改；

https可以进行加密 、身份认证和完整性校验；

加密：使用SSL/TLS协议对传输的数据进行加密，确保数据在传输过程中的安全性；

身份认证：使用SSL/TLS证书对服务器进行身份认证，防止假冒网站；

完整性校验：通过数据摘要（哈希算法）来保证数据在传输过程中不被篡改。

但是https首次连接更慢，服务器有一定的性能开销，但是在现代网络环境下影响很小，已经成为主流。

#####2.时间复杂度和空间复杂度？

时间复杂度是指算法执行次数随输入规模增长的趋势，常见有O（n）、O（1）、O（n的2次方）、O（logn）；

空间复杂度是指算法运行额外占用的内存空间，例如是否新建数组或者递归调用栈。

##### 3.CSS水平/垂直/水平垂直居中的方式：

##### 3.1垂直居中：

1.行内元素

```css
单行文本垂直居中：关键是盒子高度和行高度相等
.container{
    height=100px;//盒子高度
    line-height=100px;//行高
    //行高是用文本+上空隙+下空隙组成的，行高越高，前面三者越大，行高越小，前面三者越小；所以如果行高大于盒子高度的话，文本是要低于盒子高度的，也就不是居中了，而是靠下一点
}
```



2.垂直居中块级元素：

```html
<div class="class"></div>
```

```css
.class{
    display:flex;
    align-items:center;
}
```

##### 3.2水平居中：

1.行内元素：

```css
单行文本水平居中：
.container{
    text-align:center;
}
```

2.块级元素：

```css
传统margin方法：
.container{
    width:200px;//must be written
    margin:0 auto;//0-top&bottom;auto--left&right;
}
```

```css
利用flex布局：
.container{
    display:flex;
    justify-content:center;
}
```

```css
grid网格：
.container{
    display:grid;
    justify-content:center;
}
```

```css
绝对定位+transform：
.parent{
    position:relative;将父元素设置为相对定位，absolute元素以他为参照物，他不动
}
.child{
    position:absolute;
    left:50%;先以父元素为参照物，左边距为父元素的50%，但目前还在中间偏右一点点
    transform:translateX(-50%);这时候再向左移动子元素本身的50%实现水平居中
}
```

```css
绝对定位+margin
.parent{
    position:relative;
}
.child{
    position:absolute;
    left:0;
    right:0;
    margin:0 auto;
    width:200px;
}
```

```css
将子元素化为行内块，然后父元素直接文本居中
.parent{
    text-align:center;
}
.child{
    display:inline-block;
}
```



#####3.3 水平垂直居中

1.flex

```html
<div class=".container">我要水平垂直居中</div>
```

```css
.container{
    display:flex;
    justify-content:center;//水平
    align-items:center;//垂直
}
```

2.grid

```css
.container{
    display:grid;
    place-items:center;//其实这也是justify-content和align-items的简写
}
```

3.绝对定位+transform

```css
.container{
    position:relative;
}
.child{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}
```

4.table-cell

```css
.parent{
    display:table-cell;
    text-align:center;
    vertical-align:middle;
    width:300px;
    height:200px;
}
.child{
    display:inline-block;
    //但要注意，这里只是把儿子的内容转为了行内元素，儿子并不一定是唯一的行内元素
    //如果父亲元素有内容的话，和儿子块会被认为是一个整体行内元素
}
```

##### 两栏布局

传统float方法：

左固定，右适应；但是容易发生浮动塌陷，就是浮动的部分脱离文档流（但没脱离文本流），导致左边不占据父级元素，父级元素的高度就可能为0；容易发生浮动塌陷的情况有float、absolute、

```html
<div class="container">
<div class="left"></div>
<div class="right"></div>
</div>

```

```css
.left{
    float:left;
    靠左边浮动
    width:200px;
}
.right{
    margin-left:200px;
    左边距为200px
}
```

inline-block方法：

```css
.left {
  width: 200px;
  vertical-align: top;
  background-color: blue;
  display: inline-block;
  /* 既能并排，又能设置宽高，仍占据文档流，但是和float不是一个布局 */

}

.right {
  display: inline-block;
  background-color: pink;
  width: calc(100%-200px);
}
```

flex方法：

```css
.container{
    display:flex;
}
.left{
    float:left;
}
.right{
    flex:1;
}
```

grid方法

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  /* 第一列：200px固定；第二列：1fr是剩余空间； */
}

.left {
  background-color: blue;
}

.right {
  background-color: aquamarine;
}
```

##### 三栏布局

1.float布局：

```html
 <div class="container">
    <div class="left">left</div>
    <div class="right">right</div>
    <div class="center">center</div>
    <!-- 注意这里要把center放最后，首先float布局没办法自动避开左右栏，其次浏览器的算账顺序是根据html
    的顺序，这样先让left，right站好位置，最后的留给center -->
  </div>
```

```css
.left {
  float: left;
  width: 200px;
}

.center {
  margin: 0 200px;
}

.right {
  float: right;
  width: 200px;
}
```

2.inline-block方法：

3.flex方法：

3.1左右固定，中间自适应

注意这时候要把center放中间，因为已经不再是float布局了

```html
  <div class="container">
    <div class="left">left</div>
    <div class="center">center</div>
    <div class="right">right</div>
  </div>
```

```css
.container {
  display: flex;
}

.left {
  width: 200px;
  background-color: aqua;
}

.right {
  width: 200px;
  background-color: blue;
}
/* 此时right和left可以合并如下
.left,
.right {
  width: 200px;
} */
.center {
  flex: 1;
  background-color: azure;
}
```

3.2三栏都自适应：

```html
.container {
  display: flex;
}

.left {
  flex: 1;
  background-color: aqua;
}

.center {
  flex: 2;
  background-color: black;
}

.right {
  flex: 1;
  background-color: brown;
}

/* 自适应的宽度比例为1:2:1 */
```

3.3中间定宽，左右自适应：

```css
.container {
  display: flex;
}

.center {
  width: 200px;
}

.right,
.left {
  flex: 1;
}
```

4.grid布局

中间固定，左右自适应

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
}
```

 ⚠️ 面试可能追问的高级方案（了解即可）

 圣杯布局 / 双飞翼布局

用途：

- 解决 **中间内容优先加载**
- 老浏览器时代的性能优化方案

👉 **现代开发基本不用**，
但面试官可能会问你**听没听过**。

你只要说：

> 知道，主要是通过负 margin 和 padding 实现的。

就够了。

##### 三角形

```html
<body>
  <div class="box"></div>
</body>
```

```css
.box {
  width: 0px;
  height: 0;
  border-bottom: 50px solid red;
  border-top: 50px solid transparent;
  border-left: 50px solid transparent;
  border-right: 50px solid red;
}

/* 绘制一个三角形其实就是利用一个正方形盒子的边框border
1.首先设置正方形盒子box元素的宽高都为0
2.根据三角形指向需求，设置盒子的边框上右下左的颜色为transparent
3.50px--边框宽度；solid是边框样式；颜色自己调节 */
```























