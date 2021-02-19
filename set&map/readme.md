##set
概念：类似数组，成员的值都是唯一的，没有重复的值
```javascript
const s = new Set([1,1,2,3,4,4]);
s.add('1');
console.log([...s]);
//[1,2,3,4]
```
######注意：5和"5"是两个不同的值，NaN是相同的值
##Set实例的属性和方法
* Set.prototype.constructor：构造函数，默认就是Set函数。
* Set.prototype.size：返回Set实例的成员总数。
* add(value)：添加某个值，返回Set结构本身
* delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
* has(value)：返回一个布尔值，表示该值是否为Set的成员。
* clear()：清除所有成员，没有返回值。
##### Array.from方法可以将Set结构转为数组。
```javascript
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
```
##### 提供了去除数组重复成员的另一种方法
```javascript
Array.from(new Set([1,2,2,3]))
```
## 遍历操作
##### 有四个遍历方法，可遍历成员
* keys()：返回键名的遍历器(健值名一样，行为同values()一致)
* values()：返回键值的遍历器(健值名一样，行为效果同keys()一致)
* entries()：返回键值对的遍历器
* forEach()：使用回调函数遍历每个成员
```javascript
const s = new Set(['1',1,2,3,NaN,NaN]);
for (let item of s.keys()) {
    console.log(item);
}
//'1' 1 2 3 NaN
for (let item of s.values()) {
    console.log(item);
}
//'1' 1 2 3 NaN
for (let item of s.entries()) {
    console.log(item);
}
//['1',1] [1,1] [2,2] [3,3] [NaN,NaN]
s.forEach(v=>{
    console.log(v)
});
//'1' 1 2 3 NaN
```
##### Set实例默认可遍历，默认遍历器为values
```javascript
Set.prototype[Symbol.iterator] === Set.prototype.values
```
## WeakSet
* WeakSet成员只能是对象
* 对象是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的
#####构造函数
```javascript
var a = [[1,2], [3,4]];
var ws = new WeakSet(a);

//以下报错
var b = [3, 4];
var ws = new WeakSet(b);
```
######注意：构造函数可以接受具有iterable接口的对象作为参数，但是是参数成员作为WeakSet成员，而不是参数本身
## Map
###### Object本质是健值对的集合(Hash结构)，只能使用字符串做键名(貌似number,boolean,null,undefined)也可以，不能使用对象，由此引入Map
```javascript
const element = document.createElement('div');
const data = {
    1: 1,
    '2': 2,
    true: 3,
    [element]:4,
    null:5,
    undefined:6,
};
console.log(data);
//1: 1
//2: 2
//[object HTMLDivElement]: 4
//a: 7
//null: 5
//true: 3
//undefined: 6
```
#####Map构造函数
Map可以接受一个数组作为参数，该数组的成员是一个表示健值对的数组
```javascript
var map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size; // 2
map.has('name'); // true
map.get('name'); // "张三"
map.has('title'); // true
map.get('title') // "Author
```
######实际上执行下面的算法
```javascript
var items = [
  ['name', '张三'],
  ['title', 'Author']
];
var map = new Map();
items.forEach(([key, value]) => map.set(key, value));
```
###### 注意：如果健名严格相等，视为同一个健，包括0和-0，虽然NaN不严格等于自身，但视为同一个健
* size
* set
* get
* has
* delete
* clear
###### 注意：Map没有map、filter方法，但是有foreach方法
## WeakMap
与Map类似Map，但是只接受对象作为键名(null除外)，键名指向的对象不计入垃圾回收机制
###### 注意 WeakMap没有key()、values()和entries()，clear()方法，也没有size属性，只有get()、set()、has()、delete()方法

