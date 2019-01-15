####一、函数的基本用法
#####1、函数的length属性
```javascript
       /*在指定默认值以后，length属性返回没有指定默认值的参数。如果
       * 设置默认值的参数不是为参数，那么该参数后面没有设置默认值的参
       * 数也不再计数,并且rest参数不计入length属性中*/
```
######2、作用域
```javascript
    /*如果设置了默认值，则在函数初始化的时候，参数之前会形成一个单独的作用域*/
    let x = 1;
    function f(x,y=x) {}
    f(2)
    //y=2,xy形成单独的作用域，y不会指向全局的x
    
    function f1(x1=y1) {}
    //y1未被定义
    
    function f1(x1=x1) {}
    //x1未被定义，暂时性死区
```
#####3、严格模式
```javascript
    /*只要函数的参数设置了默认值，解构赋值，扩展运算符，函数体内就不能显示
    * 的设置严格模式否则会报错，因为，只有从函数体内才能知道是否为严格模式，
    * 但是以上方法就表明了为严格模式
    */
```
#####4、name属性
```javascript
    /*返回函数的函数名*/
    let f = function() {}
    //f.name = 'f'。es5返回''
    
    let f1 = function f1() {}
    //f1.name = 'f1'。es5返回'f1'
    
    (new Function).name
    // anonymous
    
    f.bind({})
    //'bound  f'。(function(){}).bind({}).name 'bound'
```

#####5、箭头函数
```javascript
    /*不需要返回值可以加一个void*/
    let fn = () => void null;
```
####二、注意事项
#####1、函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。也就是说this的指向不会变
#####2、不可以当成构造函数，也就是说不能使用new
#####3、不可以使用arguments对象，可以使用rest代替
#####4、不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
#####