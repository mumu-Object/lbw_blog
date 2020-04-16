// 引入express框架
const express = require('express');
// 创建博客展示页面路由
const admin = express.Router();

// 渲染登录页面路由
admin.get('/login', require('./admin/loginPage'));

// 实现登录功能
admin.post('/login', require('./admin/login'));

// 渲染用户列表页面路由
admin.get('/user', require('./admin/userPage'));

// 实现退出功能
admin.get('/logout', require('./admin/logout'));

// 添加用户页面路由
admin.get('/user-edit', require('./admin/userEdit'));

// 添加用户
admin.post('/user-edit', require('./admin/addUser'));

// 修改用户
admin.post('/user-modify', require('./admin/userModify'));

// 删除用户
admin.post('/remove-user', require('./admin/removeUser'));
// 导出路由对象
module.exports = {
  admin
}