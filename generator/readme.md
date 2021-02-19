* yield在表达式左边时，必须加括号
```javascript
function* a () {
    console.log('Hello' + (yield 123));
}
```
* yield在作为函数参数和表达式右边时，不用加括号
```javascript
function f() {}
function* a () {
    f(yield 'a', yield 'b');
    let input = yield 123;
}
```
## 与Iterator接口的关系
人一个对象的Symbol.iterator方法，返回该对象的一个遍历器对象，由于generator函数就是遍历器生成函数，因此可以把generator函数赋值给Symbol.iterator属性
```javascript
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```
## next方法的参数
yield语句本身没有返回值，或者说总是返回undefined，next方法可以带一个参数，该参数可以被当做上一个yield语句的返回值
## for...of循环
此循环可以自动遍历generator函数，不需要调用next方法
## Generator.prototype.throw()
generator函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在generator内捕获
```javascript
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
```
###### 注意，generator函数只能捕获第一个错误，第二个错误由全局捕获，throw方法被捕获以后，会附带执行下一条yield语句。也就是说，会附带执行一次next方法
```javascript
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}

var g = gen();
g.next() // a
g.throw() // b
g.next() // c
```
## Generator.prototype.return()
可以给定返回的值，终结遍历generator函数
###### 注意：如果Generator函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。
```javascript
function* numbers () {
    yield 1;
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();
console.log(g.next()); // { done: false, value: 1 }
console.log(g.next()); // { done: false, value: 2 }
console.log(g.return(7)); // { done: false, value: 4 }
console.log(g.next()); // { done: true, value: 5 }
console.log(g.next()); // { done: true, value: 7 }
```
* 第一个next执行yield 1
* 第二个next返回yield 2
* 第一个return执行finally和yield 4
* 第三个next执行yield 5
* 第四个next执行yield 同时返回return参数
## yield*语句
在一个generator函数里面调用另一个generator函数，用此语句。实际上，任何数据结构只要有Iterator接口，就可以被yield*遍历。
```javascript
function* foo() {
    yield 2;
    yield 3;
    return "foo";
}
function* bar() {
    yield 1;
    var v = yield* foo();
    console.log("v: " + v);
    yield 4;
}
var it = bar();
console.log(it.next());
// {value: 1, done: false}
console.log(it.next());
// {value: 2, done: false}
console.log(it.next());
// {value: 3, done: false}
console.log(it.next());
// "v: foo"
// {value: 4, done: false}
console.log(it.next());
// {value: undefined, done: true}
```
## Generator与状态机
```javascript
var clock = function*() {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};
```
## 作为数据结构
```javascript
function *doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}

for (let task of doStuff()) {
  // task是一个函数，可以像回调函数那样使用它
}
```
