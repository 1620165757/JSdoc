class MyPromise {

    executor = null;

    test = 'test'

    constructor(executor) {
        this.executor = executor;

        const resolve = (params) => {
            console.log('resolve', params)

        }

        const reject = (params) => {

        }

        executor(resolve, reject)
    }

    then = (thenCallback) => {
        thenCallback(1112)
    }

    static resolve = () => {

    }

    static reject = () => {

    }
}


const mp = new MyPromise((resolve, reject) => {
    resolve(11)
}).then(res => {
    console.log('res', res)
}, err => {
    console.log('err', err)
})

console.log('-----',mp.test)