class Words_class {
    constructor(props) {
        this.a = 1
    }

    b = 2

    static c = 3

}


"use strict";

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
    } else {
        obj[key] = value;
    }
    return obj;
}

var Words_class = function Words_class(props) {
    console.log('Words_class',this)
    _defineProperty(this, "b", 2);

    this.a = 1;
};

_defineProperty(Words_class, "c", 3);