##1.模块加载实质
1.1 加载机制不同
* ES6模块加载，值的引用
* CommonJS，值的拷贝
##浏览器的模块加载
```html
<script type="module" src="foo.js"></script>
```
由于带有module字段，浏览器会认为是ES6模块，且都是异步加载外部脚本，不会阻塞浏览器，但要注意以下几点
* 该脚本自动采用严格模式
* 该脚本内的顶层变量只对内部可见，外部无法使用
* 顶层的this关键字返回undefined，而不是返回window
##CommonJS模块加载原理
* require命令第一次加载该脚本，会执行整个脚本文件，然后在内存里生成一个对象
```
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
```
上面代码就是nodejs内部加载模块后生成的一个对象
* id：模块名
* exports：模块输出的各个接口
* loaded：表示该模块是否执行完毕
以后需要用到这个模块的时候，就回到exports上面去，如果再次require，也不会再次执行，而是到缓存里取值
##CommonJS模块的循环加载

```javascript
//test1.js
console.log('这是test1','1')
require('./test2')
console.log('这是test1','2')
```
```javascript
//text2.js
console.log('这是test2','1')
require('./test1')
console.log('这是test2','2')
```
```javascript
//index.js
require('./test1');
require('./test2.js');
```
输出结果
这是test1 1
这是test2 1
这是test2 2
这是test1 2
## ES6模块的循环加载


