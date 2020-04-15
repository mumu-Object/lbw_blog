// 引入express框架
const express = require('express');
// 引入系统path模块
const path = require('path');
// 引入home路由对象
const { home } = require('./route/home');
// 引入home路由对象
const { admin } = require('./route/admin');
// 引入express-session
const session = require('express-session');
// 引入连接数据库
require('./model/connect')
// 引入body-parser模块
const bodyParser = require('body-parser');
// 创建网站服务器对象
const app = express();
// 配置session 会在请求对象中配置一个session对象
app.use(session({ secret: 'session key' }));
// 处理post请求参数 如果extended值为false 会使用系统模块querystring处理post参数 否则使用第三方模块qs处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
// 当渲染后缀为art的模板时 使用express-art-template
app.engine('art', require('express-art-template'));
//设置模板存放路径 第一个参数是固定views的 
app.set('views', path.join(__dirname, 'views'));
// 告诉express 模板的默认后缀是什么
app.set('view engine', 'art');
// 开放静态资源访问
app.use(express.static(path.join(__dirname, 'public')));
// 登录拦截
app.use('/admin', require('./middleware/loginGuard'));
// 匹配home路由对象
app.use('/home', home);
// 匹配home路由对象
app.use('/admin', admin);

// 监听端口
app.listen(80, () => {
  console.log('Blog Server Runing in http://localhost')
})