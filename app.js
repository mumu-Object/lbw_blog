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
require('./model/connect');
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
// 导入morgan 打印浏览器请求信息模块
const morgan = require('morgan');
const config = require('config');
console.log(config.get('title'))
// 运行环境
if (process.env.NODE_ENV == 'development') {
  // 开发环境
  console.log('当前是开发环境')
  app.use(morgan('dev'));
} else{
  // production 生产环境
  console.log('当前是生产环境')
}
// 登录拦截
app.use('/admin', require('./middleware/loginGuard'));
// 匹配home路由对象
app.use('/home', home);
// 匹配admin路由对象
app.use('/admin', admin);
// 错误处理中间件
app.use((err, req, res, next) => {
  // 将对象字符串错误信息字转换成错误对象
  console.log(err)
  const errObj = JSON.parse(err);
  // 判断用户是修改用户出错还是添加用户出错
  if (errObj.message.indexOf('修改的') != -1) {
    res.redirect(`${errObj.path}message=${errObj.message}`);
  } else if (errObj.message.indexOf('请先进行登录') != -1) {
    res.redirect(`${errObj.path}message=${errObj.message}`);
  }
  else {
    res.redirect(`${errObj.path}?message=${errObj.message}`);
  }
});

// 监听端口
app.listen(80, () => {
  console.log('Blog Server Runing in http://localhost')
})