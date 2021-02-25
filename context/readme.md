#上下文
##概念
JavaScript代码解析和运行时所处的环境

##类型
* 全局上下文：   
* 函数上下文：每次函数调用会为该生成一个函数上下文   
* eval上下文：运行在eval函数中的代码会获得上下文

##执行栈
概念：用于储存在代码执行期间储存的上下文（后进先出）   

当程序运行时，会在栈中推入一个全局上下文，每当调用函数时，会在顶端推入该函数的上下文。引擎会执行上下文在顶端对应的函数，当函数执行完毕之后，从栈中弹出，接着执行下一个上下文对应的函数

##执行上下文的创建
* 创建阶段

* 执行阶段
####***创建阶段***  
在JavaScript代码被执行前，上下文处于创建阶段，此阶段做了三件事  
* 确定this的值
* 词法环境被创建
* 变量环境被创建

this的值：在全局上下文中，this指向window（严格模式为undefined），在函数上下文中，this指向取决于被谁调用  

词法环境（包含2种类型）：
* 全局环境：外部环境引用为null
* 函数环境：用户在函数中定义的变量，函数和参数储存在环境记录里面

每种环境由以下2个部分组成：
* 环境记录：存放变量和函数声明的地方
* 对外部环境的引用：可以用来访问外部的词法环境（原型链）  

环境记录包含2种类型：
* 声明性环境记录：储存变量，函数和参数。一个函数环境包含声明性环境记录
* 对象环境记录：用于定义在全局上下文中出现的变量和函数的关联。全局环境包含对象环境记录

注意：词法环境包含全局环境和函数环境，对于函数环境，它的环境记录包括arguments对象

环境变量：

####***执行阶段***
再次阶段，完成对变量的分配，最后执行代码，如果找不到变量的值，则将其分配为undefined