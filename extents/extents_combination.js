//组合继承
//通过调用父类的构造，继承父类的属性并保留传参的优点，然后通过将父类的实例作为子类的原型，实现函数复用
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

function Cat(name){
    Animal.call(this);
    this.name = name || 'Tom';
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

const cat = new Cat();
console.log(new Animal());

//特点1：可以继承父类实例的属性和方法，也可以继承原型的属性和方法
//特点2：即是子类的实例(const cat = new Cat())，也是父类的实例(Cat.prototype = new Animal())
//特点3：不存在属性共享问题
//特点4：可传参
//特点5：函数可复用

//缺点1：调用了2次父类构造函数，生成了2份实例(子类实例覆盖原型实例)
