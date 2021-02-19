let count=500 //全局作用域
function foo1() {
    let count = 0;//函数全局作用域
    function foo2() {
        count++;//函数内部作用域
        console.log(this);
        return count;
    }
    return foo2;//返回函数
}
let result = foo1();
result();
