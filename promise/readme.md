## 1.特点
* 异步操作以同步模式表达出来，避免的嵌套和回调
## 2.缺点
* 无法取消promise
* 当处于pending状态时，无法得知进展到哪一个阶段（刚开始还是即将结束）
* 没有回调函数时，抛出的错误外部无法捕获
## 3.基本用法
##### 3.1 resolve的作用是将pending状态改为resolve状态，reject的作用是将pending状态改为reject
```javascript
const p1 = new Promise(function (resolve, reject) {
    resolve('p1')
});
const p2 = new Promise(function (resolve, reject) {
    resolve(p1)
});
//最终的状态由p1决定
```
## 4.Promise.all()
概念：用于将多个promise实例，包装成一个新的promise实例，如果不是promise实例，则会调用Promise.resolve方法，将参数转为Promise实例
```javascript
//参数可以不是数组，但必须具有iterator接口，且每个成员都返回promise实例
let p = Promise.all([p1, p2, p3]);
```
* 都是resolve，则p为resolve，返回值组成数组
* 至少一个reject，则p为reject，返回值为第一个reject的返回值
## 5.Promise.race()
概念：同Promise.all()，但是取决于第一个改变状态的promise
## 6.Promise.resolve()
概念：将现有的对象转为promise实例
```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```
参数分以下4中情况
* 参数是promise实例时，不做任何操作
* 参数是thenable对象，转换成promise，并立即执行then方法
* 参数不是thenable对象，或者根本不是对象，返回新的promise对象，状态为resolve
* 不带任何参数，立即执行resolve的promise的对象，是在本轮'事件循环'结束时执行
```javascript
//下轮开始
setTimeout(function () {
  console.log('three');
}, 0);
//本轮结束
Promise.resolve().then(function () {
  console.log('two');
});
//立即执行
console.log('one');
// one
// two
// three
```
## 7.Promise.reject()
同Promise.resolve()

