Object.values()，Object.entries()，Object.keys()
* for...in 遍历对象自身的和继承的可枚举属性（不含Symbol属性）
* Object.keys() 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性） 
* Object.getOwnPropertyNames() 包含对象自身的所有属性和不可枚举属性（不含Symbol属性）
* Object.getOwnPropertySymbols() 包含自身所有的Symbol属性
* Reflect.ownKeys() 包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举

#继承
```javascript
const obj = {
  __proto__: prot,
  foo: 123,
};
```
ES6规定__proto__只有浏览器要部署，其他环境不用部署。如果去除__proto__，上面代码就要改成下面这样
```javascript
const obj = Object.create(prot);
obj.foo = 123;
// 或者
const obj = Object.assign(
  Object.create(prot),
  {
    foo: 123,
  }
);
// 或者
const obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123,
  })
);
```
