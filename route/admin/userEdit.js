const {Users} = require('../../model/users');
module.exports = async (req, res) => {
  // 修改用户
  if (req.query.id) {
    let { message } = req.query;
    const modifyUser = await Users.findOne({ _id: req.query.id });
    res.render('admin/user-edit', {
      modifyUser,
      message
    });
  }
  // 添加用户
  else {
    let { message } = req.query;
    res.render('admin/user-edit',{message});
  }
}