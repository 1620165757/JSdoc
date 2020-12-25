const obj = Object.create({a:1},Object.getOwnPropertyDescriptors({b:1}));
console.log(obj);
