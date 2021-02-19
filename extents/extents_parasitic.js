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

// //作用是将父类的原型方法和属性赋给子类，同时修改子类构造函数的指向
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

// (function(){
//     // 创建一个没有实例方法的类
//     var Super = function(){};
//     Super.prototype = Animal.prototype;
//     //将实例作为子类的原型
//     Cat.prototype = new Super();
// })();
