##1.Object.is()
#####1.1 概念：比较两个值(对象或者基本类型)是否相等
######tips：==会自动转换类型，===NaN不等于自身切-0等于+0
```javascript
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```
##2.Object.assign()
#####2.1 概念：用于合并对象，将源对象的所有可枚举对象，复制到目标对象
* 第一个参数是目标对象，后面的都是源对象
* 如果有同名属性后面的会覆盖前面的属性
* 如果只有一个参数，会直接返回该参数
* 如果该参数不是对象，则会先转成对象
* 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
* 如果非对象参数是源对象，都会转换成对象，如果是undefined和null，则会跳过，且不报错
* 其他类型的值(数值，字符串，布尔值)，作为源对象，不会报错，除了字符串会以数组形式拷入，其他的不会产生影响
* 浅拷贝
```javascript
Object.assign(2) // Number(2)

let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true

let v1 = 'abc';
let v2 = true;
let v3 = 10;
let obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```
#####2.2 为对象添加属性
将x和y属性，添加到Point实例中
```javascript
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
```
#####2.3 为对象添加方法
```javascript
Object.assign(SomeClass.protopyte,{
    someMethod(){}
    anotherMethod(){}
});

// 等同于下面的写法
SomeClass.protopyte.someMethod = function() {};
SomeClass.protopyte.anotherMethod = function() {}
```
#####2.4 克隆对象(浅拷贝)
```javascript
Object.assign({}, origin);
```
######注意：这种克隆方式只能克隆原始对象的属性，不能拷贝继承的属性，可以通过以下方式保持继承链
```javascript
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```
##3.属性的可枚举性
#####3.1 对象每个属性都有一个描述对象，用来控制该属性的行为
```javascript
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
//描述对象的enumerable属性，称为'可枚举性'，如果该属性为false，就表示某些操作会忽略当前属性
```
#####3.2 ES5有三个操作会忽略enumerable为false的属性
* for...in循环：只遍历对象自身和继承的可枚举属性
* Object.keys：返回对象自身可枚举的键名
* JSON.stringify：只串行化对象自身可枚举的属性
* ES6中Object.assign只拷贝自身可枚举的属性
* ES6规定，所有Class的原型的方法都是不可枚举的。
```javascript
const obj = {};
Object.defineProperty(obj,'toString',{
    enumerable:true//true:可遍历toString
});
for (let key in obj){
    console.log(key);//toString
}
```
##4.属性的遍历(5种)
* for...in 遍历对象自身的和继承的可枚举属性（不含Symbol属性）
* Object.keys() 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性） 
* Object.getOwnPropertyNames() 包含对象自身的所有属性和不可枚举属性（不含Symbol属性）
* Object.getOwnPropertySymbols() 包含自身所有的Symbol属性
* Reflect.ownKeys() 包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。
######注意：遍历的次序规则 数值(大小)-字符串(生成时间)-Symbol(生成时间)
```javascript
const obj = {
    b: 1,
    1:1,
    A:1,
    2:1
};
obj.a = 1;
console.log('111111', Object.keys(obj));
//["1", "2", "b", "A", "a"]
```
##5.__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
#####5.1 __proto__用来读取当前对象的prototype对象
#####5.1
#####5.1
##6. Object.values()，Object.entries()，Object.keys()
#####6.1 Object.keys 返回一个数组，成员是参数对象(不含继承的)所有可遍历的(enumerable)属性的键名
#####6.2 Object.values 返回一个数组，成员是参数对象(不含继承的)所有可遍历的(enumerable)属性的键值(排序根据健值排序)
#####6.3 Object.entries返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组(排序同上)
```javascript
//Object.keys Object.entries同理
const obj1 = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj1);
// ["b", "c", "a"]

//显式声明enumerable，默认是不可遍历的
const obj2 = Object.create({}, {p: {value: 42}});
Object.values(obj);
// []

//会过滤掉Symbol属性
Object.values({ [Symbol()]: 123, foo: 'abc' });
// ['abc']

//参数是一个字符串，会返回各个字符组成的一个数组
Object.values('foo');
// ['f', 'o', 'o']

//Object.entries转为map
const obj3 = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
```
##7. 对象的扩展运算符(...)(跟结构赋值不同)
#####7.1 结构赋值不会拷贝继承自原型对象的属性
```javascript
let o1 = {a: 1};
let o2 = {b: 2};
o2.__proto__ = o1;
console.log({...o2});//{b:2}这是扩展运算，不会读取原型上的属性
const {a, b} = o2;//a:1 b:2 这是结构赋值，会读取原型上的属性
console.log(a, b);
```
##8. Object.getOwnPropertyDescriptors()
概念：ES7有一个提案，返回指定对象所有自身属性（非继承属性）的描述对象，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题
```javascript
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true 
//    },
//   bar:
//    { get: [Function: bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true 
//    } 
// }
```
```javascript
const source = {
    set foo(value) {
        console.log(value);
    }
};
console.log(Object.assign({}, source));//{foo:undefined}
```
```javascript
const source = {
    set foo(value) {
        console.log(value);
    }
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
console.log(Object.getOwnPropertyDescriptor(target2, 'foo'));
// { get: undefined,
//   set: [Function: foo],
//   enumerable: true,
//   configurable: true 
// }
```
