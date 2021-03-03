function AA() {
    this.a = 1
}

function BB() {

}

console.log(Reflect.construct(AA, [],BB))
console.log(new AA())