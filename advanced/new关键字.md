###原理：
#####步骤
1.声明一个空对象  
2.将这个空对象的原型指向构造函数的原型  
3.将构造函数的this指向该空对象  
4.返回空对象
```javascript
    /*Person不能使用箭头函数，不然func.prototype为undefined*/
    let Person = function (name, age) {
        this.name = name;
        this.age = age;
        this.getName = function () {
            return this.name;
        }
    };
    
    let New = function (func) {
        /**/
        console.log(func.prototype);
        let res = {};
        if (func.prototype !== null) {
            res.__proto__ = func.prototype;
        }
        func.apply(res, Array.prototype.slice.call(arguments, 1));
        return res;
    };
    
    let personal = New(Person, 'zhangsan');
```
**tips:**  
* 可以通过in来判断，一个对象是否拥有某一个属性/方法，无论是该属性/方法存在与实例对象还是原型对象
* in的这种特性最常用的场景之一，就是判断当前页面是否在移动端打开
  (isMobile = 'ontouchstart' in document),很多人喜欢用浏览器UA的方式来判断，但并不是很好的方式
```javascript
    /*第一种*/
    function Person() {}
    Person.prototype.getName = function() {}
    Person.prototype.getAge = function() {}
    Person.prototype.sayHello = function() {}
    
    /*第二种*/
   function Person() {}
   Person.prototype = {
       constructor: Person,
       getName: function() {},
       getAge: function() {},
       sayHello: function() {}
   }
   //tips:实际上是重新创建了一个{}对象并赋值给Person.prototype
   //这里的{}并不是最初的那个原型对象。因此它里面并不包含constructor属性
   //为了保证正确性，我们必须在新创建的{}对象中显示的设置constructor的指向。
   //即上面的constructor: Person
```

















