//实例继承
//为父类实例添加新特性，作为子类返回
function Animal(name) {
    //属性
    this.name = name || 'animal';
    //实例方法
    this.sleep = function () {
        console.log('sleep...')
    }
}

Animal.prototype.eat = function () {
    console.log('eat...')
};

function Cat(name) {
    const instance = new Animal();
    instance.name = name || 'Tom';
    return instance;
}

Cat.prototype.aa = function () {
    console.log(11111)
};

const cat = new Cat();
console.log(cat);

//特点1：不限制调用方式，new Cat()还是Cat()都是相同的效果

//缺点1：实例是父类的实例，不是子类的实例，即，无法为子类添加实例属性和方法，以及原型属性和方法，只能通过父类实现，导致所有子类共享父类
//缺点1：不支持多继承
