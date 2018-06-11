### 一、类型   
    简单数据类型：Undefined、Null、Boolean、Number、String
    复杂数据类型：boject
### 二、type of操作符
    可能返回下列字符串：undefined、boolean、string、number、boject、
    function。注意type of null会返回object。chrome7之前版本会对正则表达式返回
    function，其他会返回object
### 三、Undefined
    只有一个值得数据类型，使用var声明但是没有对其初始化时，
    这个值就是undefined
### 四、Null
    只有一个值得数据类型,从逻辑角度来讲表示一个空对象指针，所以type of 检测会
    返回object,注意null==undefined的结果是true
### 五、Boolean
    非空字符串、非零数值(包括无穷大)、任何对象会转化为true;空字符串、0和NaN、
    null、undefined会转化为false
### 六、Number
    Number('a') -> NaN
    Number('') -> 0
    Number('00011') -> 11
    Number(true) -> 1
    parseInt()在转换字符串时，会忽略字符串前面的空格，知道找到第一个非空字符，如果第一个
    不是数据或者负号，会返回NaN，如果第一个是数字，会继续解析后面的字符，直到解析完
    所有后续字符或者遇到非数字字符
### 七、String
    null和undefined没有toString()方法
    
    
    