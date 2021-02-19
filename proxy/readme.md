## 1.概念
在目标对象之前架设一层'拦截'，外界对该对象的访问，都必须通过这层拦截，可以对外界的访问进行过滤和改写
```javascript

var proxy = new Proxy(target, handler);

const obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});
```
###### 注意 如果handle没有设置任何拦截，那就等于直接通向源对象
```javascript
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```
##### proxy也可以作为其他对象的原型
```javascript
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```
* get(target, propKey, receiver)，拦截对象的读取操作
* set(target, propKey, value, receiver)，拦截对象属性的设置
* 拦截对象的propKey in proxy的操作，以及对象的hasOwnProperty方法，返回一个布尔值
* deleteProperty(target, propKey)，拦截delete proxy[propKey]的操作，返回一个布尔值。
* ownKeys(target)，拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回对象所有自身的属性，而Object.keys()仅返回对象可遍历的属性
* getOwnPropertyDescriptor(target, propKey)，拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
* ...还有其他
## this问题
```javascript
const target = {
    m: function () {
        console.log(this);
    }
};
const proxy = new Proxy(target, {});
target.m(); // 指向m
proxy.m();  // 指向proxy
//如果换层箭头函数，则指向window
```
## Reflect

