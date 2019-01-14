####一、用法
#####1、基本用法
```javascript
    /*完全解构*/
    let [a,b,c] = [1,2,3]
    //a=1,b=2,c=3
    
    let [a, ...b] = [1, 2, 3, 4];
    //a=1,b=[2,3,4]
    
    let [x, y, z] = new Set(['a', 'b', 'c']);
    //Generator函数也可以解构
    
    /*不完全解构*/
    let [a, [b], c] = [1, [2, 3], 4];
    // a=1,b=2,c=4
```
#####2、解构赋值允许默认值
```javascript
    let [a = 1] = [undefined];
    //a=1。注意，右边的值只有等于undefined时才能使用默认值
    
    /*默认值可以引用其他已经声明的变量*/
    let [x = 1, y = x] = [];
    // x=1; y=1
    
    let [x = y, y = 1] = [];     
    // y is not defined
```
#####3、对象的解构赋值
```javascript
    /*属性和变量名一致*/
    let { bar, foo } = { foo: "aaa", bar: "bbb" };
    //或
    let { bar:bar, foo:foo } = { foo: "aaa", bar: "bbb" };
    //bar="aaa",foo="bbb"
    
    let { baz } = { foo: "aaa", bar: "bbb" };
    //baz=undefined
    
    /*属性和变量名不一致*/
    let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
    //baz="aaa"
    
    /*指定默认值*/
    let {x = 3} = {};
    //等价于
    let {x:x = 3} = {}
    
    /*对象的解构赋值可以将现有的对象的方法，赋值到某个变量*/
    let { log, sin, cos } = Math
    
    /*数组是特殊的对象，也可以将数组解构赋值给对象*/
    let arr = [1, 2, 3];
    let {0 : first, [arr.length - 1] : last} = arr;
    //first=1,last=3
```
#####4、字符串的解构赋值
```javascript
    /*字符串被转换成了一个类似数组的对象*/
    let [a, b, c, d, e] = 'hello';
    
    /*字符串还有一个length属性,因此可以对这个属性解构赋值*/
    let {length} = 'hello'; 
```
#####4、数值和布尔值的解构赋值
```javascript
    /*会将数值或布尔值转化为对象Object(x)*/
    let {toString:ts} = 123;
    //ts === Number.prototype.toString
```
#####5、函数参数的解构赋值
```javascript
    /*这两种的默认值的解构是不一样的*/
    function move1({x = 0, y = 0} = {}) {}
    function move2({x, y} = { x: 0, y: 0 }) {}
    // move({x: 3}); // [3, undefined]
    // move({}); // [undefined, undefined]
    //move(); // [0, 0]
```

####二、用途
#####1、交换变量
```javascript
    let x = 1;
    let y = 2;
    [x, y] = [y, x];
```
#####2、遍历map结构
```javascript
    const map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');
    for (let [key, value] of map) {
      console.log(key + " is " + value);
    }
```
#####3、输入模块的指定方法
```javascript
    const { SourceMapConsumer, SourceNode } = require("source-map");
```

####三、注意事项
#####1、如果等号右边是不可遍历解构，那么将会报错
#####2、
```javascript
    let {foo: {bar}} = {baz: 'baz'};
    //会报错，{bar} = undefined,undefined.bar自然会报错
```
#####3、将一个已经声明的变量用于解构赋值，必须非常小心。
```javascript
    let x;
    {x} = {x: 1};
    // SyntaxError: syntax error。正确的写法:
    let x;
    ({x} = {x: 1});
```
#####4、解构赋值的规则是，只要等号右边的不是对象或者数组，则将其转换为对象，但是undefined和null不能转化为对象，会报错







