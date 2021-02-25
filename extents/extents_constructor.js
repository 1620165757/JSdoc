//构造继承
//使用父类的构造函数来增强子类，等于是复制父类的实例属性给子类

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
}

const cat = new Cat();
console.log(cat.name);//无法获取父类原型上的eat方法

//特点1：解决父类属性和方法被所有子类共享的问题
//特点2：解决无法向父类传参的问题Animal.call(this,'cat')
//特点3：可以实现多继承(call多个父类)

//缺点1：实例不是父类的实例，只是子类的实例，因为父类复制给了子类
//缺点2：只能继承父类的实例属性和方法，原型方法和属性无法继承
//缺点3：无法实现父类的复用，还是复制问题，影响性能

/**
 *构造函数继承
 *1.无法继承父类原型链上的属性和方法，
 *2.是对父类实例的拷贝
 */

function Parent1(color) {
    this.color = color || 'red'
}

Parent1.prototype.size = 'big'

function Son1(color) {
    Parent1.call(this, color)
}

const son1 = new Son1('blue');
console.log(son1.color)
console.log(son1.size)

