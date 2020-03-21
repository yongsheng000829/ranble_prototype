#### 1.什么是MVVM
    Model - View - ViewModel
    模板     视图    视图模板


```js
对vue来说 
data 就是model 
div 就是 view 
通过双向数据绑定把数据渲染到div里 然后导出的组件实例 就是v-m
    data = {}

    <div v-for="item in data">
        <h2>{{item.name}}</h2>
    </div>

    export default {}
```

#### 前端发展史

1. html 全称是Hyper Text Markup Language  1993
2. 最早的html 纯文本页面
3. CGI技术 为了解决不同用户能看到不同页面 向浏览器输出拼接字符串，这个技术就叫CGI
4. 新的创建动态HTML的方式 ASP JSP PHP （模板字符串）
5. js (兼容问题)
```js
    //<div id="root"></div>
    document.getELementById('root').innerHTML = 'hello world'
    document.getELementById('root').style.color = 'red'
```
6. jquery
```js
    $('#root').text('hello world').css('color':'red')
```
7.MVC  Model - view - Contorllar

8.MVVM Model View ViewModel 数据驱动视图

       工作：Model ->  ViewModel <- View 



