(() => {
    // let z = Symbol();
    // let a = {
    //     x: Symbol(),
    //     z:1
    // };
    let a = Symbol('a');
    let b = Symbol('b');
    let c = Symbol('c');
    const obj = {
        [c]: 1
    };


    obj[a] = 'Hello';
    obj[b] = 'World';
    // for (let y in obj) {
    //     console.log(y)
    // }
})();