//new 关键字
//1.
function Point1(name) {
    this.name = name
}

//原型方法
Point1.prototype.run = function () {
    console.log('run...')
};

//静态方法
Point1.say = function () {
    console.log('say...')
};

function createObj(con) {
    const obj = {};
    obj.__proto__ = con.prototype;
    con.call(obj,'cat');
    return obj
}

const point1 = createObj(Point1);
console.log(point1);


