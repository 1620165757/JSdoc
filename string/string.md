##1.codePointAt
1.1能够正确处理4个字节储存的字符，返回一个字符的码点
```javascript
    var s = '𠮷a';
    s.codePointAt(0) // 134071
    s.codePointAt(1) // 57271
    s.codePointAt(2) // 97
```
1.2测试一个字符由两个字节还是由四个字节组成
```javascript
    function is32Bit(c) {
      return c.codePointAt(0) > 0xFFFF;
    }
    is32Bit("𠮷") // true
    is32Bit("a") // false
```
##2.fromCodePoint
2.1用于从码点返回对应字符,不能识别32位的UTF-16字符（Unicode编号大于0xFFFF）
```javascript
    String.fromCodePoint(0x20BB7)
    // "𠮷"
    String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
    // true
```
##3.字符串的遍历器接口
```javascript
    for (let codePoint of 'foo') {
      console.log(codePoint)
    }
    // "f" // "o"// "o"
```
##4.includes(), startsWith(), endsWith()，repeat()
* includes()返回布尔值，是否找到对应字符串，都支持第二个参数，表示开始搜索的位置
* startsWith()返回布尔值
* endsWith()返回布尔值
* ()返回新值，
##5.repeat
5.1表示将原字符重复多少次，如果是小数会被floor取整，负数或者Infinity，会报错，0-1，-1-0，NaN等同于0，字符串，则会先转换成数字
```javascript
    'x'.repeat(3); // "xxx";
    'na'.repeat(0); // "";
    'na'.repeat(2.9); // "nana"
    'na'.repeat(Infinity);// RangeError
    'na'.repeat(-1);// RangeError
    'na'.repeat(NaN); // ""
    'na'.repeat('na'); // ""
```
##6.padStart()，padEnd()
6.1如果某个字符串不够指定长度，会在头部或尾部补全，如果省略第二个参数，则会用空格补全长度。
##7.Number.isFinite(), Number.isNaN()
* Number.isFinite()用来检查一个数值是否为有限的(除了数字其他全为false)
* Number.isNaN()用来检查一个值是否为NaN
#####ES5可通过一下方法实现
```javascript
(function (global) {
  const global_isFinite = global.isFinite;
  Object.defineProperty(Number, 'isFinite', {
    value: function isFinite(value) {
      return typeof value === 'number' && global_isFinite(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```
#####注意
    它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false
##8.Number.isInteger()
```javascript
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false
```
##9.Number.EPSILON
Number.EPSILON的实质是一个可以接受的误差范围。
```javascript
(0.1 + 0.2 - 0.3) < Number.EPSILON // true
```
##10.安全整数和Number.isSafeInteger()
* 安全整数：-2^53(MIN_SAFE_INTEGER)到2^53(MAX_SAFE_INTEGER)之间（不含两个端点）超过这个范围，无法精确表示这个值
* isSafeInteger判断一个整数是否落在这个范围之内
##11.Math对象的扩展
11.1Math.trunc()去除一个数的小数部分，返回整数部分，非数字会先转换成数字
```javascript
Math.trunc(-0.1234) // -0
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};
```
11.2Math.sign()来判断一个数到底是正数、负数、还是零
* 参数为正数，返回+1
* 参数为负数，返回-1
* 参数为0，返回0
* 参数为-0，返回-0
* 其他值，返回NaN

##12.指数运算符**，目前Babel转码器已经支持
```javascript
2 ** 2 === 4; // 4
2 ** 3; // 8

let a = 2;
a **= 2;
// 等同于 a = a * a;

let b = 3;
b **= 3;
// 等同于 b = b * b * b;
```














####一、基本用法
#####1、字符串遍历器接口
```javascript
    /*es6为字符串增加了遍历器接口，可用for...of循环遍历*/
    for(let s of 'string'){}
```
#####2、includes(),startsWith(),endsWith()新方法，分别返回布尔值
#####3、repeat()
```javascript
    /*返回一个新字符串，表示将原字符串重复几次,*/
    'a'.repeat(3)
    //aaa
    
    /*如果是小数，则向下取整*/
    'a'.repeat(2.9)
    //aa
    
    /*如果是负数或者Infinity，则会报错*/
    
    /*如果是0到-1直接的数，取整为-0，视为0,NaN视为0,字符串则转为数字*/
    'a'.repeat(-0.5);//''
    'a'.repeat(NaN);//''
    'a'.repeat('1');//'a'
    'a'.repeat('s');//''
```
#####4、padStart(),padEnd()
```javascript
    /*如果字符串不够指定长度，则padStart()在头部补全，padEnd()在尾部补全*/
    'a'.padStart(4,'12345');//123a
    'a'.padStart(4,'1');//111a
    'a'.padEnd(4,'12345');//a123
    'a'.padEnd(4,'1');//a111
```
