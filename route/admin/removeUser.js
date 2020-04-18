const { Users } = require('../../model/users');
const {Article } = require('../../model/article');
module.exports = async (req, res) => {
  // 删除用户
  await Users.deleteOne({ _id: req.body.id });
  console.log(await Article.findOne({ author: req.body.id }));
  // 判断用户当前页是不是只有一个用户可以删除 如果是就跳转当前页面减1
  if (req.body.user == 'true' && req.body.page) {
    return res.redirect('/admin/user?page=' + (req.body.page -1));
  }
  // 判断用户地址栏是否有page参数
  if (req.body.page) {
    return res.redirect('/admin/user?page=' + req.body.page);
  } else {
    res.redirect('/admin/user');
  }
  // res.send('ok');
}