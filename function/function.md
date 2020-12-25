##1.函数参数的默认值
##2.函数的length属性
概念：将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。
######注意：length的含义是预期传入的参数，如果指定默认值了，预期传入的参数就不包括该参数，rest参数也不会计入length属性，如果默认参数不是尾参，后面的参数也不在计入
##3.rest参数
概念：ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了
```javascript
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```
######注意：函数的rest参数只能放在最后一个，rest参数不计算在函数的length属性里面
##4.扩展运算符
概念：好比rest的逆运算
##5.替代数组的apply方法
由于扩展运算符可以展开数组，所以不在需要apply将数组转化为函数参数了
```javascript
// ES5的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f(...args);

// ES5的写法
Math.max.apply(null, [14, 3, 77]);

// ES6的写法
Math.max(...[14, 3, 77]);

// 等同于
Math.max(14, 3, 77);

// ES5的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
```
##6.严格模式
ES6规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错
######原因：严格模式同时适用于函数体和函数参数
##7.name属性
返回该函数的函数名
* 如果将匿名函数赋值给变量，ES5返回空，ES6返回变量名
* 如果将非匿名函数赋值给变量，ES5，ES6返回函数名
* Function构造函数返回的函数实例，name为anonymous
* bind返回的函数，name属性值上会加上"bound"前缀
```javascript
var func1 = function () {};
func1.name; // ES5 ""
func1.name;//ES6 "func1"

const bar = function baz() {};
bar.name; // ES5 "baz"
bar.name // ES6 "baz"

(new Function).name; // "anonymous"

function foo() {}
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "
```
##8.箭头函数
* 函数体内的this指向，是定义时所在的对象，而不是使用时所在的对象
* 不可以当成构造函数，也就是不能使用new命令
* 不可使用arguments对象，但是可以使用rest参数
* 不可使用yield，也就是不能当成Generator函数
##9.绑定this
概念：函数绑定运算符(::)，该运算会自动将左边的对象，作为上下文
```javascript
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);
```
如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上
```javascript
var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;

let log = ::console.log;
// 等同于
var log = console.log.bind(console);
```
##10.尾调用优化
概念：指函数的最后一步是调用另一个函数
一下不属于尾调用
```javascript
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
  return undefined;
}
```
#####10.1调用帧
概念：函数调用会在内存里面形成一个调用记录，叫调用帧，用于保存调用位置和内部变量
```javascript
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(5) // 120

//改成

function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5, 1) // 120
```
