####一、概述
#####第七种数据类型（前六种：String Number Boolean Undefined Null Object）
####二、基本用法
```javascript
    let s1 = Symbol('foo');
    //s1 Symbol('foo')
    let s2 = Symbol();
    //s2 Symbol()
    
    /*如果是一个对象，则先调用toString方法*/
    let s3 = Symbol({a:1})
    //s3 Symbol([object Object])
    let a = {
            toString() {
                return 123
            },
        };
    let s4 = Symbol(a)
    //s4 Symbol(123)
```
####三、作为属性名
```javascript
    /*一下3种写法都可以，不能用点运算符*/
    let sym = Symbol('sym')
    let obj = {
        [sym]:1
    }
    obj[sym] = 2
    Object.defineProperty(a, sym, { value: 'Hello!' });
```
####四、属性名的遍历
```javascript
    /*Symbol不能被for...in、for...of、Object.keys()、
    Object.getOwnPropertyNames()、Object.getOwnPropertyNames()
    所使用，但是可以用Object.getOwnPropertySymbols，返回一个数组，
    Reflect.ownKeys返回所以类型的键名
     */
```
####五、Symbol.for()、Symbol.keyFor()
```javascript
    /*Symbol.for()重新使用一个Symbol值，接受一个字符串，然后搜索有没有已该参数作为名称的
    * Symbol值，如果有，返回这个Symbol，否则新建立一个Symbol值,Symbol.for()和Symbol()
    * 虽然都会生成新的Symbol，但是Symbol.for()会被登记在全局中使用*/
    let s1 = Symbol('s');
    let s2 = Symbol('s');
    //s1===s2;
    
    /*Symbol.keyFor()返回一个全局登记的Symbol值*/
    let s1 = Symbol.for('foo')
    Symbol.keyFor(s1)
    //foo
    let s2 = Symbol('koo')
    Symbol.keyFor(s2)
    //undefined
   
    
```

####注意事项
#####1、相同参数的Symbol值是不一样的
```javascript
    let a = Symbol('qq')
    let b = Symbol('qq')
    // a != b
```
#####2、Symbol不能和其他类型的值进行计算，但是可以显示的转为字符串和布尔值，不能转为数值
```javascript
    let sym = Symbol('a');
    String(sym); // 'Symbol(My symbol)'
    sym.toString(); // 'Symbol(My symbol)'
    let sym = Symbol();
    Boolean(sym); // true
    !sym;  // false
```