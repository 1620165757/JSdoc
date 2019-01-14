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