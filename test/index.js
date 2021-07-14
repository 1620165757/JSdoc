const p1 = Promise.resolve(111)
p1.then(result => {
    console.log(result)
})
console.log(222)
setTimeout(() => {
    console.log(333)
})

const p2 = new Promise(resolve => {
    resolve(444)
})
p2.then(result => {
    console.log(result)
})
