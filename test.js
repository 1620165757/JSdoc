(() => {

    document.getElementById('aa').addEventListener('click', debounce(lo, 1500));

    function lo() {
        console.log(111)
    }

    function debounce(method, delay) {
        let timer = null;
        return function () {
            let self = this,
                args = arguments;
            /*这一段很重要，第一次进来，开始执行setTimeout,time=1，如果延迟时间内再次点击,
            * 清除上一次的setTimeout,time=2，如果不在点击，则是执行第二次的setTimeout，即time=2
            */
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                method.apply(self, args);
            }, delay);
        }
    }
})();