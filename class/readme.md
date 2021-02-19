## 1.基本用法
#### 概述
传统生成对象的方法是通过构造函数，例如
```javascript
function Point(x,y) {
    this.x = x;
    this.y = y;
}
const point = new Point(1,2);
```
ES6生成对象利用class，例如
```javascript
class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y
    }
   
    //不能使用箭头函数
    toValue(){}

}
const point = new Point(1,2);

typeof Point;//function
Point === Point.prototype.constructor //true
Point.prototype //constructor toValue 类的所有方法都定义在类的prototype属性上面
```
ES5定义的方法可枚举，ES6的不可枚举
```javascript
const Point1 = function (x, y) {};
Point1.prototype.toString = function() {};

class Point2{
    constructor() {
    }
    toString(){}
}
console.log(Object.keys(Point1.prototype));//[toString]
console.log(Object.keys(Point2.prototype));//[]
```
类的属性名，可以采用表达式
```javascript
const methodName = 'methodName11';
class Point {
    [methodName](){
        console.log(1111)
    }
}
```
## constructor方法
通过new生成实例时自动调用该方法，一个类必须具有该方法，如果没有显示定义，空的该方法会被默认添加，该方法默认返回this，也可以返回另外的对象
```javascript
class Foo {
    constructor() {
        return Object.create(null);
    }
}
const foo = new Foo();
console.log(foo.constructor === Foo);//false
```
类的实例除非显示定义在其本身(this对象上)，否则都是定义在原型上
```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
const point = new Point(2, 3);
point.toString(); // (2, 3)
point.hasOwnProperty('x'); // true
point.hasOwnProperty('y'); // true
point.hasOwnProperty('toString'); // false
point.__proto__.hasOwnProperty('toString') // true
```
与ES5一样，类所有的实例共享一个原型对象
```javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__ === p2.__proto__;//true
```
意味着可以通过实例的__proto__为class添加方法，且所有实例共享该方法
```javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__.printName = function () { return 'Oops' };
p1.printName(); // "Oops"
p2.printName(); // "Oops"
```
class不存在变量提升，与ES5不同，原因在于类的继承
```javascript
new Foo(); // ReferenceError
class Foo {}
```
如果class存在变量提升，此时由于const定义的Foo不存在变量提升，所以还未定义，Bar无法继承
```javascript
const Foo =class  {}; // ReferenceError
class Bar extends Foo{}
```
class也可以使用表达式定义，这个类的名字是MyClass而不是Me，Me只在Class的内部代码可用，指代当前类
```javascript
const klass = class  Me{
    getClassName() {
        return Me.name;
    }}
```
采用Class表达式，可以写出立即执行的Class。
```javascript
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```
class私有方法
```javascript
const bar = Symbol('bar');

export default class myClass{
  // 私有方法
  [bar](baz) {}
}
```
this的指向，默认指向实例，如果提取出来单独使用该方法，指向运行时的环境
```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }
  print(text) {
    console.log(text);
  }
}
const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
解决办法可以换成箭头函数或者使用proxy代理
```javascript

```
class只是构造函数的一层封装，函数的很多特性都被class继承
## Class的继承
子类必须在constructor里面调用super方法，否则会报错。这是因为子类没有自己的实例对象，而是继承自父类，然后对其加工
* ES5继承：先创造子类的实例对象this，然后再将父类的方法添加到this上（Parent.apply(this)）
* ES6继承：先创造父类的实例对象this（调用super），然后在对其修改
## 类(非继承)的__proto__和prototype
* 类的__proto__等于Function.prototype
```javascript

```
## 类的prototype属性和__proto__属性
子类和父类的prototype属性和__proto__关系
```javascript
class Point1 {}
class Point2 extends Point1 {}
// Point2.__proto__ = Point1
// Point2.prototype.__proto__ = Point1.prototype
```
实现原理
```javascript
class A {}
class B {}
// B的实例继承A的实例
Object.setPrototypeOf(B.prototype, A.prototype);
// B继承A的静态属性
Object.setPrototypeOf(B, A);

//Object.setPrototypeOf方法的实现
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
};

Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;
```
## extents的继承目标
```javascript
class B extends A {}
```
只要是拥有prototype的函数(Function.prototype)，就能被继承，以下是三种特殊情况
1.子类继承Object类
```javascript

```
2.无继承
```javascript
class A {}
//A.__proto__ === Function.prototype  true
//A.prototype.__proto__ === Object.prototype  true
```
* A是普通函数，继承自Function
* Function继承自Object
3.继承自null
```javascript
//A.__proto__ === Function.prototype  true
//A.prototype.__proto__ === undefined  true
```
## Object.getPrototypeOf()
用来从子类上获取父类
```javascript
Object.getPrototypeOf(ColorPoint) === Point //true
```
## super关键字
当做函数使用，代表父类的构造函数，但此时this还是指向子类，只能在子类的构造函数里面使用
```javascript
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A(); // A
new B(); // B
```
当做对象使用，指向父类的原型，但是定义在实例上(在constructor里用this定义)的对象无法通过super获取
```javascript
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
//此时super.p() === A.prototype.p()
```
注意：
* super调用父类的方式时，自动绑定子类的this super.p.call(this)
* 用super对某个值赋值时，此时super=this
* 使用super的时候，必须显示的指明是对象还是函数，不能单独使用，例如console.log(super)
```
constructor() {
    super();
    super.x = 'b'; // this.x = 'b'
  }
```
## 实例的__proto__属性
实例对象的__proto__.__proto__属性指向父类，可通过此修改父类的原型方法
## 原生构造函数的继承
原生构造函数有以下几种
* Boolean()
* Number()
* String()
* Date()
* Array()
* Function()
* Object()
* Error()
* RegExp()
这些通过ES5是不能继承的，但是可以使用ES6的extends继承，但是继承Object有一个行为差异，不能通过super向父类Object传参(会被忽略)，只能通过new Object('1')
```javascript
class NewObject extends Object{
  constructor(arg) {
    super(arg);
  }
}
const obj = new NewObject({x:1});
console.log(obj.x); // undefined
```
## class的getter和setter函数
和ES5一样，class内部可以使用get和set关键字，达到对某个属性存储的拦截
```javascript
class MyClass {
  constructor() {}
  get prop() {
    return 'getter'
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}
let inst = new MyClass();
inst.prop = 123;
// setter: 123
console.log(inst.prop);
// 'getter'
```
## class的静态方法
类相当于实例的原型，在类中定义的方法都会被继承，但是静态方法不会被实例继承，父类子类和super都可以直接调用
## Class的静态属性和实例属性
class的静态属性只能通过以下方法定义，不能再class内部直接定义
```javascript
class Foo {}
Foo.prop = 1;
Foo.prop // 1
```
## new.target属性
用来确定构造函数是怎么调用来的
```javascript
function Person(name) {
    //或者new.target === Person
    if (new.target !== undefined) {
        this.name = name;
    } else {
        throw new Error('必须使用new生成实例');
    }
}
const p1 = new Person('1');//正确
const p2 = Person.call(p1,'1');//报错
```
在class内部使用，返回当前class，子类继承父类时，返回的是子类，利用这个特点可以写出只能继承不能实例化的类
```javascript
class Point1 {
  constructor() {
    if (new.target === Point1){
      throw new Error('该类只能继承，不能实例化')
    }
  }
}
class Point2 extends Point1{}
new Point1();//报错
new Point2();//正确
```

