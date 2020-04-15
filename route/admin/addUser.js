// 引入joi第三方模块
const Joi = require('joi');
// 引入bcryp密码加密模块
const bcrypt = require('bcrypt');
// 用户集合
const { Users } = require('../../model/users');
// 创建验证规则
const addUserSchema = {
  username: Joi.string().min(2).max(16).required().error(new Error('用户名不符合验证规则')),
  email: Joi.string().email().required().error(new Error('邮箱不符合验证规则')),
  password: Joi.string().regex(/^[a-zA-z0-9]{3,30}$/).required().error(new Error('密码不符合验证规则')),
  role: Joi.string().valid('normal', 'admin').required().error(new Error('非法的角色值')),
  state: Joi.number().valid(0, 1).required().error(new Error('非法的状态值'))
};
module.exports = async (req, res) => {
  try {
    // 开始验证
    await Joi.validate(req.body, addUserSchema);
  } catch (err) {
    // 如果验证失败重定向到原来页面
    res.redirect(`/admin/user-edit?message=${err.message}`);
    return;
  }
  // 在数据库中查找是否存在此邮箱
  let user = await Users.findOne({ email: req.body.email });
  // 如果邮箱存在
  if (user) {
    res.redirect(`/admin/user-edit?message=此邮箱已被占用`);
    return;
  }
  // 加密密码
  // 生成随机字符串
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  req.body.password = password;
  await Users.create(req.body);
  res.render('admin/user');
  
}