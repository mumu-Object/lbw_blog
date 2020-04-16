const { Users } = require('../../model/users');
module.exports = async (req, res) => {
  await Users.deleteOne({ _id: req.body.id });
  res.redirect('/admin/user');
  // res.send('ok');
}