##1.Array.from()
概念：将类似数组的对象（array-like object，有length属性）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）
```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
可以接受第二个参数，作用类似于数组的map方法
```javascript
Array.from([1,2,3], x => x * x);
// 等同于
Array.from([1,2,3]).map(x => x * x);
// [1, 4, 9]
```
如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this，
另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，
可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。
```javascript
Array.from('𠮷').length; //1
'𠮷'.length//2
```
##2.Array.of()
概念：用于将一组值，转化为数组，主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异
```javascript
Array.of(3, 11, 8); // [3,11,8]
Array.of(3); // [3]
Array.of(3).length; // 1
Array(); // []
Array(3); // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```
##3.copyWithin
概念：在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
也就是说，使用这个方法，会修改当前数组。
```javascript
Array.prototype.copyWithin(target, start = 0, end = this.length);
```
* target(必选)从该位置开始替换数据
* start(可选) 从该位置开始读取数据，如果为负数，则倒数
* end(可选) 到该位置停止读取数据，默认为数组长度，如果为负数，则倒数
######注意：以上参数均为数字，否则转换为数字
```javascript
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4);//[4,2,3,4,5]
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)//[4,2,3,4,5]
```
##4.find()和findIndex()
* find:参数是回调函数(v,idx,arr)，数组成员一次执行该函数，返回满足条件的第一项，如果没有返回undefined
* findIndex:同上，但是返回满足条件项的下标，没有则为-1，第二个参数绑定this
######注意：这两个方法都可以发现NaN，弥补了数组的IndexOf方法的不足。
```javascript
[NaN].indexOf(NaN)// -1
[NaN].findIndex(y => Object.is(NaN, y))// 0
```
##5.fill()
```javascript
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```
##6.entries()，keys()和values()
概念用于遍历对象，返回遍历器对象，接着可以用for...of循环遍历，也可以手动调用next方法
* keys：遍历键名
* values：遍历健值
* entries：遍历键值对
##7.includes()
概念：在某数组中是否包含给定值，第二个参数表示查找的起始位置，默认为0，可以判定NAN，indexOf不能
```javascript
[NaN].includes(NaN)
// true
[NaN].indexOf(NaN)
// -1
```
######注意：
##8.数组的空位
概念：数组的空位是指某一个位置没有任何值，不包括undefined，null，Array构造函数返回的数组都是空位
#####8.1 ES5对空位的处理
* foreach,every,filter,some都会跳过空位
* map会跳过空位，但是会保留该值
* join和toString会将空位视为undefined，而undefined和null会被处理成空字符
```javascript
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true); // ['a','b']

// every方法
[,'a'].every(x => x==='a'); // true

// some方法
[,'a'].some(x => x !== 'a'); // false

// map方法
[,'a'].map(x => 1); // [,1]

// join方法
[,'a',undefined,null].join('#'); // "#a##"

// toString方法
[,'a',undefined,null].toString(); // ",a,,"
```
#####8.2 ES6对空位的处理
将空位全部处理成undefined
