/**
 * new 步骤
 * 1.声明一个空对象
 * 2.将这个空对象的原型指向构造函数的原型
 * 3.将构造函数的this指向该空对象
 * 4.返回空对象
 */
(() => {
    /*Person不能使用箭头函数，不然func.prototype为undefined*/
    let Person = function (name, age) {
        this.name = 123;
        this.age = age;
        this.getName = function () {
            return this.name;
        };
    };

    let New = function (func) {
        let res = {};
        if (func.prototype !== null) {
            res.__proto__ = func.prototype;
        }
        //TODO 实例res的原型已经指向了构造函数的原型，为什么还要指定this?
        /*解释：*/
        func.apply(res, Array.prototype.slice.call(arguments, 1));
        return res;
    };

    let personal = New(Person, 'zhangsan');

    let a = function () {

    };
    console.log('a', a.prototype)

})();