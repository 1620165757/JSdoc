class AA {
    constructor() {
        this.a = 1
    }

    //b和c需要加插件@babel/plugin-proposal-class-properties
    b = 2
    //实例方法，实例的hasOwnProperty，返回true
    c = function () {
    }

    //原型方法，实例的hasOwnProperty，返回false
    d() {
    }

    static e() {
    }
}

console.log('AA', new AA())

/**babel实现原理*/
function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        const params = {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        }
        Object.defineProperty(obj, key, params);
    } else {
        obj[key] = value;
    }
    return obj;
}

function BB() {
    _defineProperty(this, "b", 2);
    _defineProperty(this, "c", function () {
    });
    this.a = 1;
}

_createClass(BB, [{
    key: "d",
    value: function d() {
    }
}], [{
    key: "e",
    value: function e() {
    }
}]);

console.log('BB', new BB())

/**
 * 简易实现原理
 * 1.class的constructor
 * 2.constructor外部的属性和函数表达式通过Object.defineProperty挂载到this（实例）上
 * 3.所有方法都是定义在原型上的，例如constructor（排除函数表达式）
 * @constructor
 */
function CC() {
    const params = {
        enumerable: true,
        configurable: true,
        writable: true
    }
    Object.defineProperty(this, 'b', {value: 2, ...params})
    Object.defineProperty(this, 'c', {
        value: function () {
        }, ...params
    })
    this.a = 1
}

CC.e = function () {
}
CC.prototype.d = function () {
}
console.log('CC', new CC())

// "use strict";
//
// function _instanceof(left, right) {
//     if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
//         return !!right[Symbol.hasInstance](left);
//     } else {
//         return left instanceof right;
//     }
// }
//
// function _classCallCheck(instance, Constructor) {
//     if (!_instanceof(instance, Constructor)) {
//         throw new TypeError("Cannot call a class as a function");
//     }
// }
//
// function _defineProperties(target, props) {
//     // console.log('props',target,props)
//     for (var i = 0; i < props.length; i++) {
//         var descriptor = props[i];
//         descriptor.enumerable = descriptor.enumerable || false;
//         descriptor.configurable = true;
//         if ("value" in descriptor) descriptor.writable = true;
//         Object.defineProperty(target, descriptor.key, descriptor);
//     }
// }
//
// function _createClass(Constructor, protoProps, staticProps) {
//     if (protoProps) _defineProperties(Constructor.prototype, protoProps);
//     if (staticProps) _defineProperties(Constructor, staticProps);
//     return Constructor;
// }
//
// function _defineProperty(obj, key, value) {
//     if (key in obj) {
//         Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
//     } else {
//         obj[key] = value;
//     }
//     return obj;
// }
//
// var DD = /*#__PURE__*/function () {
//     function DD() {
//         _classCallCheck(this, DD);
//
//         _defineProperty(this, "b", 2);
//
//         _defineProperty(this, "c", function () {
//         });
//
//         this.a = 1;
//     }
//
//     _createClass(DD, [{
//         key: "d",
//         value: function d() {
//         }
//     }], [{
//         key: "e",
//         value: function e() {
//         }
//     }]);
//
//     return DD;
// }();
// console.log(new DD())
