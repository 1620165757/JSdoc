/**
 * new关键字
 * 1.对象获得构造函数的实例
 * 2.对象的__proto__指向构造函数的prototype
 * @param Func
 * @returns {{}}
 */
function newObject(Func) {
    const obj = {};
    Func.call(obj)
    obj.__proto__ = Func.prototype;
    return obj
}
