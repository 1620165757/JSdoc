class AA {
    constructor() {
        this.a = 1
    }

    b = 2
    c = function () {
    }

    d() {
    }

    static e() {
    }
}

console.log(new AA())

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

console.log(new BB())

/**简易实现原理*/
function CC() {
    const params = {
        enumerable: true,
        configurable: true,
        writable: true
    }
    console.log('this',this)
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
console.log(new CC())

//class的实例属性（constructor里面的属性），对应构造函数的实例属性
//class的其他属性（constructor外面的属性），对应构造函数的实例的属性
//class的静态属性，对应构造函数.属性

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
