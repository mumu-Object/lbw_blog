const { Users } = require('../../model/users');
const bcript = require('bcrypt');
module.exports = async (req, res,next) => {
  const { email, password } = req.body;
  // 判断请求参数是否正确
  if (email.trim().length == 0 || password.trim().length == 0) {
    return res.status(400).render('home/loginerror', { msg: '邮箱地址或密码错误' });
  }
  // 在数据库中查找是否存在此用户 不存在会返回null 存在则会返回用户信息
  let user = await Users.findOne({ email });
  // 存在此用户
  if (user) {
    // 判断输入的密码是否对应上数据库中加密后的密码 返回promise对象
    let isLogin = await bcript.compare(password, user.password);
    // 密码验证成功
    if (isLogin) {
      // 将用户名存储在请求对象中
      req.session.username = user.username;
      // 将登录的用户数据存放在locals中 供全部模板使用 在req对象中app指向网站服务器对象
      req.app.locals.userInfo = user;
      // 重定向到主页
      res.redirect('/home/index')
    }
  }
  // 不存在此用户
  else {
    return res.status(400).render('home/loginerror', { msg: '邮箱地址或密码错误' });
  }
}