//拷贝继承
//
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
    const animal = new Animal();
    for(let p in animal){
        console.log(p);
        Cat.prototype[p] = animal[p];
    }
    this.name = name || 'Tom';
}

new Cat();

//特点：支持多继承

//缺点：循环复制影响性能
