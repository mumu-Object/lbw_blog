// 引入express框架
const express = require('express');
// 创建博客展示页面路由
const home = express.Router();

// 展示页面主路由
home.get('/', (req, res) => {
  res.send('home');
});

// 导出路由对象
module.exports = {
  home
}