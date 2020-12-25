##1.暂时性死区
#####ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
    var tmp = 123;
    if (true) {
      tmp = 'abc'; // 报错
      let tmp;
    }
    function bar(x = y, y = 2) {
      return [x, y];
    }
    
    bar(); // 报错
    function bar(x = 2, y = x) {
      return [x, y];
    }
    bar(); // [2, 2]
##2.不允许重复声明
#####let不允许在相同作用域内，重复声明同一个变量。
    // 报错
    function () {
      let a = 10;
      var a = 1;
    }
##3.为什么需要块级作用域
#####1.内层变量可能会覆盖外层变量
    var tmp = new Date();
    
    function f() {
      console.log(tmp);
      if (false) {
        var tmp = "hello world";
      }
    }
    
    f(); // undefined
    内层tmp覆盖了外层tmp
#####2.用来计数的循环变量泄露为全局变量
##4.const命令
#####1.const一旦声明变量，就必须立即初始化，不能留到以后赋值
#####2.复合类型的变量,const只保证地址不变，并不保证数据不变
##5.顶层对象的属性
#####1.var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性


    
