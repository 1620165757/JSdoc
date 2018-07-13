function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

let hw = helloWorldGenerator();//调用时并不会执行，即不会进入函数体内部，返回的是一个遍历器对象
//hw.next(); { value: 'hello', done: false }
//hw.next(); { value: 'world', done: false }
//hw.next(); { value: 'ending', done: true }
//hw.next(); { value: undefined, done: true }

//Generator 所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。

//yield可以在for循环中使用，但是不可以在foreach中使用，因为foreach的参数是一个普通函数


//yield如果在另一个表达式中使用，必须使用圆括号
// function* demo() {
//     console.log('Hello' + yield); // SyntaxError
//     console.log('Hello' + yield 123); // SyntaxError
//
//     console.log('Hello' + (yield)); // OK
//     console.log('Hello' + (yield 123)); // OK
// }


//yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
// function* demo() {
//     foo(yield 'a', yield 'b'); // OK
//     let input = yield; // OK
// }


function* foo(x) {
    console.log('x---->' + x);
    let y1 = yield (x + 1);
    console.log('y1----->' + y1);
    let y2 = 2 * (y1);
    let z = yield (y2 / 3);
    return (x + y2 + z);
}

let a = foo(5);
a.next();// Object{value:6, done:false}
a.next();// Object{value:NaN, done:false}
