## JavaScript知识（整理中...）

# Day03

## 一. 深入JS执行原理

### 1.1. 全局对象的创建


### 1.2. 执行全局代码



### 1.3. 执行函数代码



### 1.4. 作用域作用域链

作用域是变量能被访问的范围；它定义了变量、函数和对象可被访问和可见的区域。

1.全局作用域：它是JS代码最外层的作用域,任何代码块或者函数之外声明的变量都属于全局作用域,它的特点是任何地方的代码都可以访问到全局作用域。其次就是,在浏览器环境中,全局对象是window,在Node.js环境中,全局对象是global（ES2020 之后引入了 `globalThis`，它在浏览器和 Node.js 中都指向全局对象。）。它的问题就是全局变量容易造成命名冲突和变量覆盖，增加维护难度；

2.函数作用域：函数作用域是,在函数内部创建的声明的变量只能在该函数内部访问,函数外部无法直接访问。其次就是,每次调用这个函数的时候,会创建一个新的执行上下文，形成独立的作用域；

3.块级作用域（ES6之后）：用{}包裹起来的代码块叫做块级作用域，let/const声明的变量只可在块级作用域内部被访问；出现在if语句，for/while循环，单独的代码块；

4.词法作用域：作用域在函数书写时就已经确定，跟在哪里调用无关；核心是函数的作用域取决于函数定义的位置而非函数调用的位置；词法作用域也叫做静态作用域；

作用域链：当查找一个变量时，js引擎会从当前作用域开始，一层一层往外找，直到找到为止，这条查找路径称为作用域链。



## 二. JS的内存管理

### 2.1. 内存管理的理解

从内存管理的生命周期来讲,第一步是申请需要的内存,第二步是使用分配的内存,第三步是将不需要使用的内存释放掉,总共是这三步。



### 2.2. GC实现算法

* 引用计数
* 标记清除(可达性)
* V8本身的优化:
  * 标记整理
  * 分带处理
  * 增量收集
  * 闲时收集



### 2.3. 闭包的概念理解

在计算机科学中，闭包是函数与其定义时所在词法环境的组合。在支持头等函数的语言中，为了实现词法作用域，函数必须在运行时携带其定义时的环境，这种运行时结构称为闭包。

在 JavaScript 中，当函数被创建时，它会保存对当前词法环境的引用。函数与其词法环境引用的组合就是闭包。因此，即使外层函数执行结束，只要内部函数仍然被引用，它依然可以访问外层函数中的变量。函数可以访问其定义时所在作用域中的变量，即使在函数外部执行时仍然可以访问。这种特性可以用于实现数据私有化和模块封装，但如果使用不当，可能会导致内存无法及时释放。


### 2.4. 闭包的内存流程

1️⃣ 创建全局执行上下文（压栈）

2️⃣ 创建全局词法环境

3️⃣ 定义函数时：

- 函数对象创建在堆里
- 函数内部有 [[Environment]] 指向当前词法环境

4️⃣ 调用函数时：

- 创建新的执行上下文（压栈）
- 创建新的词法环境

5️⃣ 函数执行完毕：

- 执行上下文弹栈
- 如果没有闭包引用 → 词法环境被 GC
- 如果有闭包引用 → 词法环境留在堆中



### 2.5. 闭包的内存泄漏

闭包的内存泄漏是由于闭包持有对外层词法环境的引用,导致外层词法环境中的变量无法被垃圾回收,从而持续占有内存空间。内存泄漏它本质上是什么?是程序中的一块内存空间，在失去使用价值之后仍然被引用,被标记为可访问对象、可达对象,它无法被垃圾回收机制识别并回收,从而无法释放这块内存空间,然后又无法将这块内存分配给其他需求。这样的情况叫做内存泄漏。



## 三. 整理JavaScript的代码的执行流程

##### 1.代码加载

以V8为例，先解析HTML文件，遇到script标签，下载JS文件，交给V8引擎处理

##### 2.词法分析

将代码解析为词法单元Token

##### 3.语法分析

将JS代码按照语法规则生成抽象语法树AST

##### 4.编译阶段

AST会被编译成字节码，由AST解释执行；热点代码会被Turbofan优化成为机器码

##### 5.创建执行上下文

先创建全局执行上下文，创建全局对象，生成全局词法环境，变量和函数声明提升，压入调用栈

每调用一次函数，都创建新的函数执行上下文，生成函数词法环境，压入栈，执行完毕弹出栈

##### 6.执行代码

逐行执行代码，赋值，函数调用，表达式计算


## 四. 说说你对GO/AO/VO的理解以及作用域和作用域链的理解

GO（Global Object）是全局对象，在浏览器中是 window。它在创建全局执行上下文时生成，用于存放全局变量、全局函数以及内置构造函数等。

VO（Variable Object）是变量对象，是执行上下文中用于存储变量和函数声明的抽象概念。

AO（Activation Object）是函数调用时创建的活动对象，用于存储函数参数、函数内部变量以及函数声明。

在全局执行上下文中，VO 等于 GO；在函数执行上下文中，VO 表现为 AO。

这些概念来源于 ES3/ES5 的执行模型，在 ES6 之后被 Lexical Environment 和 Environment Record 所取代。




## 五. 说说V8引擎的内存管理以及垃圾回收器




## 六. 你是如何理解闭包的,闭包到底是什么?

闭包是一个函数和其周围环境可引用的作用域的组合；闭包也是一种捆绑其词法环境的能力；闭包可以让一个内层函数访问到起外层函数的作用域；闭包是指函数与其定义时的词法环境的组合。函数可以访问其定义时所在作用域中的变量，即使在函数外部执行时仍然可以访问。这种特性可以用于实现数据私有化和模块封装，但如果使用不当，可能会导致内存无法及时释放。

## 七. 闭包为什么会产生内存泄露以及如何解决



闭包本身不会产生内存泄漏，只是因为闭包持有外层词法环境的引用，导致外层词法环境仍然处于可达状态，无法被垃圾回收。



解决方式包括：

1. 主动断开引用，例如将变量置为 null
2. 清空缓存数组
3. 移除事件监听
4. 使用 WeakMap 等弱引用结构
5. 避免在闭包环境中定义不必要的大对象




# day05

## 八. 什么是原型、原型链？

### 1.原型

原型JavaScript中，每个对象都有一个[[prototype]]属性，这个属性就叫做原型。

### 2.原型链

如果我们需要访问某个对象的属性，要先从对象自身查找，如果对象本身没有，就去找该对象的原型对象，再找不到就去找该原型对象的原型对象，这样一路查找上去，而这种链式结构就叫做原型链。

原型链的尽头是Object对象，Object是所有类的父类，而Object的prototype是null。



## 九. 如何通过原型链实现继承？

通过重写子类的显式原型对象，让子类的显式原型对象的隐式原型指向父类的显式原型对象。



## 十. 继承的各个方案以及优缺点

#### 1.原型链继承，最原始

~~~javascript
//1.原型链继承，最原始
    function Person(name, age) {
      this.name = name
      this.age = age
    }

    function Student() { }

    Student.prototype = new Person()
    // 优点：简单
    // 缺点：引用类型共享父类中的属性
    // 核心思想：new一个父类的对象赋值给子类的显示原型对象
~~~

#### 2.组合式继承（原型链+借用函数）

```javascript
function Person(name, age) {
      this.name = name
      this.age = age
    }

    function Student(name, sno) {
      Person.call(this, name)
      this.sno = sno
    }

    Student.prototype = new Person()
    // 优点：子类继承下来有了自己独立的属性，解决了引用类型共享问题
    // 缺点：性能开销大，调用了两次Person
    // 核心思想:Person.call()借用构造函数
```



#### 3.寄生式组合继承

~~~javascript
function Person(name, age) {
      this.name = name
      this.age = age
    }
    Person.prototype.running = function () {
      console.log("running!")// 必须加这一行，才能证明你通过原型链继承到了方法！
    }
    function Student(name, sno) {
      Person.call(this, name)
      this.sno = sno
    }

    Student.prototype = Object.create(Person.prototype)
    Student.prototype.constructor = Student //指回自己，保证身份不乱
    // 优点：减少了性能开销
    // 核心思想:用Object.create()构建了一个干净的原型副本，避免两次父类调用构造函数

~~~



#### 4.ES6class继承

```javascript
    class Person {
      constructor(name, age) {
        this.name = name
        this.age = age
      }
    }

    class Student extends Person {
      constructor(name, sno) {
        super(name)
        this.sno = sno
      }
    }

    // 优点：代码简洁，内聚性强
    // 核心思想:用super()继承父类构造函数中的属性和方法
```

## 十一. 最终ES5实现继承的方案

现在都ES6了，面试应该不是重点吧



# day06
## 十二. ES6类的使用(掌握)

### 2.1. class定义类

class定义类有两种写法:

~~~html
1. class Person {}
2. var Person = class {}
~~~

### 2.2. class类中的内容

* constructor方法

  ```html
  <script>
      //写在class类里面
  constructor(name, age) {
          this.name = name
          this.age = age
        }
  </script>
  ```

* 实例方法

  ~~~html
  <script>
      class Person{
          running(){
              console.log(" is running ")
          }
      }
      var p = new Person()
      p.running
  </script>
  ~~~

  ​

* 访问器方法

  ```html
  <script>
      // 1.访问器的编写方式
      // class Person {
      //   // 程序员之间的约定: 以_开头的属性和方法, 是不在外界访问
      //   constructor(name, age) {
      //     this._name = name
      //   }

      //   set name(value) {
      //     console.log("设置name")
      //     this._name = value
      //   }

      //   get name() {
      //     console.log("获取name")
      //     return this._name
      //   }
      // }

      // var p1 = new Person("why", 18)
      // p1.name = "kobe"
      // console.log(p1.name)
      // console.log(p1._name)
  </script>
  ```

  ​

* 静态方法 static


 ~~~html
<script>
    class Person{
         //类方法/静态方法
      static randomPerson() {
        var randomName = names[Math.floor(Math.random() * names.length)]
        console.log(this)
        return new Person(randomName, Math.floor(Math.random() * 100))
        //return new this(randomName, Math.floor(Math.random() * 100))
      }
    }


</script>
 ~~~




### 2.3. class的extends

* extends关键字

  ```html
  class Student extends Person{
  constructor(name,age,sno){
  super(name,age)
  this.sno = sno
  }
  }
  ```

* super关键字
  * 方式一: 构造方法 super()
    * 一定在使用this之前以及返回对象之前先调用super
    * 构造函数的首行

  * 方式二: 实例方法super.method

  * 方式三: 静态方法super.staticMethod

    ```html
     <script>

        class Animal {
          running() {
            console.log("running")
          }
          eating() {
            console.log("eating")
          }

          static sleep() {
            console.log("static animal sleep")
          }
        }

        class Dog extends Animal {
          // 子类如果对于父类的方法实现不满足(继承过来的方法)
          // 重新实现称之为重写(父类方法的重写)
          running() {
            console.log("dog四条腿")
            // 调用父类的方法
            super.running()
            // console.log("running~")
            // console.log("dog四条腿running~")
          }

          static sleep() {
            console.log("趴着")
            super.sleep()
          }
        }

        var dog = new Dog()
        dog.running()
        dog.eating()

        Dog.sleep()

      </script>

    ```

    ​



### 2.4. 继承自内置类

* 对内置类进行扩展
* Array.prototype.xxx



### 2.5. 类的混入Mixin

```js
const Flyable = (Base) => class extends Base {
  fly() {
    console.log(`${this.name} 正在飞`);
  }
};
//他是一个函数Flyable,接受一个累Base作为参数，返回一个新类，这个新类继承自Base,并且额外带了fly方法
const Swimmable = (Base) => class extends Base {
  swim() {
    console.log(`${this.name} 正在游泳`);
  }
};

class Animal {
  constructor(name) {
    this.name = name;
  }
}

// 像套娃一样，把能力一层层包进去
class Bird extends Flyable(Swimmable(Animal)) {}

const b = new Bird('鸭子');
b.fly();   // 鸭子 正在飞
b.swim();  // 鸭子 正在游泳
```

```js
// 使用时，套娃的过程就是"混入"的过程
class Bird extends Flyable(Swimmable(Animal)) {}
//                 ↑ 先把 Animal 交给 Swimmable，得到"会游泳的Animal"
//          ↑ 再把结果交给 Flyable，得到"会飞又会游泳的Animal"
// Bird 再继承这个最终结果
```

