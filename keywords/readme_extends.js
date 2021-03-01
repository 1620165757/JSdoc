"use strict";

const AA = function AA() {
    this.a = 1
};

const BB = function (_AA) {
    //原型链的继承
    BB.prototype = Object.create(_AA.prototype, {});
    BB.prototype.constructor = BB;
    Object.setPrototypeOf(BB, _AA);

    //实例的继承
    const _super = function _createSuperInternal() {
        return Reflect.construct(AA, arguments, BB);
    };

    function BB() {
        return _super.apply(this, arguments);
    }

    return BB;
}(AA);

console.log('BB', BB.prototype.__proto__)
const bb = new BB()
console.log('bb', bb)


