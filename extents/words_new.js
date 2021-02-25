//new 关键字
//1.
function Point1(name) {
    console.log(this)
    this.name = name
}

const point1 = new Point1('zhangsan')
console.log(point1);


