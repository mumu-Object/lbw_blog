// 引入bcrypt密码加密模块
const bcript = require('bcrypt');
// 引入用户集合
const { Users } = require('../../model/users');
const login = async (req, res) => {
  const { email, password } = req.body;
  // 判断请求参数是否正确
  if (email.trim().length == 0 || password.trim().length == 0) {
    return res.status(400).render('admin/loginerror', { msg: '邮箱地址或密码错误' });
  }
  // 在数据库中查找是否存在此用户 不存在会返回null 存在则会返回用户信息
  let user = await Users.findOne({ email: email });
  // 判断是否找到此用户
  if (user) {
    // 判断密码是否正确
    // compare() 验证加密后的密码 第一个参数为用户输入的密码 第二个为加密后的密码 返回布尔值
    let isValid = await bcript.compare(password, user.password);
    if (isValid) {
      // return res.status(200).render('admin/user', user);
      // 将用户名存储在请求对象中
      req.session.username = user.username;
      // 将登录的用户数据存放在locals中 供全部模板使用 在req对象中app指向网站服务器对象
      req.app.locals.userInfo = user;
      // 登录成功 重定向到用户列表页面
      res.redirect('/admin/user');
    } else {
      return res.status(400).render('admin/loginerror', { msg: '邮箱地址或者密码错误' });
    }
  } else {
    return res.status(400).render('admin/loginerror', { msg: '邮箱地址或者密码错误' });
  }
}
module.exports = login;