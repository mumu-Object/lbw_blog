const { Users,modifyValidate } = require('../../model/users');
module.exports = async (req, res, next) => {
  // 修改的用户
  let modifyUser;
  try {
    modifyUser = await Users.findById(req.query.id);
  } catch (ex) {
    // 恶意修改修改表单中的id时强制退出账户并提示用户
    return req.session.destroy(function () {
      res.clearCookie('connect.sid');
      res.status(400).render('admin/loginerror', { msg: '无效的id值' });
    });
  }
  try {
    // 验证修改用户表单
    await modifyValidate(req.body);
  } catch (ex) {
    // 将验证错误交给错误处理中间件处理
    return next(JSON.stringify({
      path: `/admin/user-edit?id=${req.query.id}&`,
      message: ex.message
    }));
  }
  await Users.updateOne(modifyUser, req.body);
  res.redirect('/admin/user');
}