// 引入bcryp密码加密模块
const bcrypt = require('bcrypt');
// 用户集合 验证用户信息函数
const { Users,validateUser } = require('../../model/users');
module.exports = async (req, res,next) => {
  try {
    // 验证用户填写的表单信息
    await validateUser(req.body);
  } catch (err) {
    // 如果验证失败重定向到原来页面
    // res.redirect(`/admin/user-edit?message=${err.message}`);
    // 使用next()将处理错误信息交给错误处理中间件 只能传递一个参数 并且是字符串类型  可以先将对象转换成字符串
    return next(JSON.stringify({ path: '/admin/user-edit', message: err.message }));
  }
  // 在数据库中查找是否存在此邮箱
  let user = await Users.findOne({ email: req.body.email });
  // 如果邮箱存在
  if (user) {
    // res.redirect(`/admin/user-edit?message=此邮箱已被占用`);
    // 发送错误信息给错误处理中间件
    return next(JSON.stringify({ path: '/admin/user-edit', message: '此邮箱已被占用' }));
  }
  // 加密密码
  // 生成随机字符串
  const salt = await bcrypt.genSalt(10);
  // 密码加密
  const password = await bcrypt.hash(req.body.password, salt);
  // 设置加密后的密码到用户提交的数据中
  req.body.password = password;
  // 添加用户
  await Users.create(req.body);
  // 重定向到用户列表页面
  res.redirect('/admin/user');
}