// 引入express框架
const express = require('express');
// 创建博客展示页面路由
const home = express.Router();

// 用户登录页面路由
home.get('/login', (req, res) => {
  res.render('home/login');
});

// 用户登录路由
home.post('/login', require('./home/login'))

// 展示页面主路由
home.get('/index', require('./home/index'))

// 文章详情页面
home.get('/article',require('./home/article'))
// 导出路由对象
module.exports = {
  home
}