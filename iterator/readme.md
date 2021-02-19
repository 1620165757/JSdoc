## 1.iterator(遍历器接口)
##### 1.1 集合：Array，Object，Map，Set
##### 1.2 概念：为各种不同的数据结构提供统一的访问机制
##### 1.3 原生具备Iterator接口的数据结构：数组，类似数组的结构，Set和Map
##### 1.4 遍历过程
* 创建一个指针，指向当前数据结构的起始位置。遍历器对象本质就是一个指针对象
* 第一次调用指针的next方法，可以指向指针的第一个成员
* 第二次调用next方法，指向第二个成员
* 不断调用next方法，知道他指向结束位置
##### 1.5 为对象部署Iterator接口
```javascript
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (let v of obj) {
    console.log(v);
}
//hello,world
```
##### 1.6 类似数组的对象部署Iterator接口
```javascript
let iterable1 = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator] //或者[][Symbol.iterator]
};
for (let item of iterable1) {
    console.log(item); // 'a', 'b', 'c'
}

//普通对象无法部署该接口
let iterable2 = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable2) {
  console.log(item); // undefined, undefined, undefined
}
```
##### 1.7 调用Iterator接口的场合
* 解构赋值
* 扩展运算符
* yield函数
##### 1.8 遍历器对象的return()，throw()
遍历器对象除了具有next方法外，还具有return和throw方法，next(必须)，return和throw是可选的
```javascript

```
##### 1.9 for...in
* 可以用break跳出循环
* 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等
* for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
* 某些情况下，for...in循环会以任意顺序遍历键名
##### 1.10 for...of
* 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
* 不同用于forEach方法，它可以与break、continue和return配合使用
* 提供了遍历所有数据结构的统一操作接口

