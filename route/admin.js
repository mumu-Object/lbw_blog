// 引入express框架
const express = require('express');
// 创建博客展示页面路由
const admin = express.Router();

// 管理登陆页面路由
admin.get('/user', (req, res) => {
  res.render('admin/article-edit')
});

// 导出路由对象
module.exports = {
  admin
}