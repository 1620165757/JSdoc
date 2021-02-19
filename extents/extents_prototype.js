//原型链继承
//核心是将父类的实例作为子类的原型

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

function Cat() {
    this.run = function () {
        console.log('run...')
    }
}

Cat.prototype = new Animal('cat');
const cat = new Cat();
console.log(cat.name);


//缺点1：为子类添加新的原型方法和属性时只能在Cat.prototype = new Animal();后，否则会被覆盖，可以构造函数中添加
//缺点2：无法实现多继承
//缺点3：来自原型的所有属性和方法被所有子类共享
//缺点4：创建子类实例时，无法向父类传参。new Cat(1)时参数无法传给父类
