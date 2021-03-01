class AA {
}

class BB extends AA {
    constructor() {
        super()
    }
}

console.log('AA', AA)
// Object.setPrototypeOf(BB,AA)
// console.log('aa',aa)

console.log('BB', Reflect.construct(AA, [{a: 2}], BB))