(() => {

    let x = 1;
    let y = 2;
    [x, y] = [y, x];
    console.log(x)
    console.log(y)
})();