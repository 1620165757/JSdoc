//获取某年某月的天数
const getMonthDays = function (year, month) {
    // //采用退位操作 例如new Date(2020,5,0) 值为"2021/5/31"
    // return new Date(year,month,0).getDate();
    //采用进位操作 例如new Date(2020,2,32) 2020-2-32 等于 2020-3-3 3月占3天，2月占32-3=29天
    return 32 - new Date(year,month-1,32).getDate();
}
console.log(getMonthDays(2020, 2))