(() => {

    // let a = Symbol('aaa');
    // let obj = {
    //     a: 1,
    //     [a]: 2,
    //     [Symbol()]: 3
    // };
    // console.log(obj[Symbol()])

    let sym = Symbol('sym');
    let obj = {
        [sym]:1
    };
    obj[sym] = 2;
    console.log(obj)
})();