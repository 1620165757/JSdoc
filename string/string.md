####一、基本用法
#####1、字符串遍历器接口
```javascript
    /*es6为字符串增加了遍历器接口，可用for...of循环遍历*/
    for(let s of 'string'){}
```
#####2、includes(),startsWith(),endsWith()新方法，分别返回布尔值
#####3、repeat()
```javascript
    /*返回一个新字符串，表示将原字符串重复几次,*/
    'a'.repeat(3)
    //aaa
    
    /*如果是小数，则向下取整*/
    'a'.repeat(2.9)
    //aa
    
    /*如果是负数或者Infinity，则会报错*/
    
    /*如果是0到-1直接的数，取整为-0，视为0,NaN视为0,字符串则转为数字*/
    'a'.repeat(-0.5);//''
    'a'.repeat(NaN);//''
    'a'.repeat('1');//'a'
    'a'.repeat('s');//''
```
#####4、padStart(),padEnd()
```javascript
    /*如果字符串不够指定长度，则padStart()在头部补全，padEnd()在尾部补全*/
    'a'.padStart(4,'12345');//123a
    'a'.padStart(4,'1');//111a
    'a'.padEnd(4,'12345');//a123
    'a'.padEnd(4,'1');//a111
```