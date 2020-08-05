# simpleSites
简单网站编程实验：网站必须进行注册登录后才可使用，后台数据库会记录合法的用户注册信息，用户登录成功后可前往主页查看疫情信息，或前往搜索页查询某国家在某段时间内的疫情走向。当前设置用户登录时间为8分钟，当用户登录状态过期，则需重新登录。


# 主要技术
HTML/CSS/JAVASCRIPT
Node.js平台、express框架、SQLite、AJAX和jQuery、

# 分类介绍

1. 服务器

* 使用Node.js平台，采用express框架，使用async/await方式解决异步处理问题，避免了callback的回调地狱。虽然相比express框架，koa框架默认支持async/await， 网上参考资料也比较多，但是由于express历史更加悠久，使用者更多，所以选择express。

* 使用session实现登录验证的功能，在客户端发起网页请求时，可对用户状态进行验证.

* 使用ejs这一Template Engine来解析模板文件，动态生成由数据和静态页面组成的视图文件。网页除了login page和register page外，均使用ejs来生成，极大的减少了重复代码量，同时也有利于服务器数据加载到html文件中。此外，考虑网页加载速度，由于search page需要加载echarts和map数据，加载速度较慢，所以在增加jsFile模板时，单独为search页面设立一个jsFileForSearch，放入echarts和map的js文件，缩短其他页面加载时间.

* 使用了helmet增加安全性。

* 使用了https and certificates增加安全性

* 由于登录页的POST操作传输给服务器的内容是formData格式，故服务器端还利用multiparty处理了该类型的数据。

* 对url进行了验证，以//或者/..或者/.开头的url均直接返回404错误信息。同时url不能包含空格，所有字符都必须为ascii字符，否则也将返回404错误信息；

* 对网页头信息进行判断，进行了内容协商。

* 为了确保网页在https和http上均不会产生错误信息，所有外部链接去掉了https：或http：，采用以//开头的形式。

2. 数据库

* 数据库使用SQLite，采用aa-sqlite module，使用async/await style实现数据库操作。

* 客户端在注册及登录时均会对数据库进行插入及查询等操作。客户端还可以通过search page来批量查询数据库中数据，服务器端生成相应的json文件，客户端读取json文件生成echarts图表展示搜索结果。

3. 动态页面

* 所有网页的导航栏在登录后均会显示当前用户名。

* Login page使用AJAX和jQuery创建快速动态网页，AJAX 在不重载页面的情况下，通过在后台与服务器进行少量数据交换，使网页实现异步更新。实现了在不重载整个页面的情况下，动态展示登录成功或失败的信息。此处客户端发送的数据采用formData的格式，服务器对该特殊类型也进行了处理。
 
* search page进行搜索后，服务器查询数据库，客户端可展示数据搜索结果。
