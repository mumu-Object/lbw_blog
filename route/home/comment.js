const { Comments } = require('../../model/comment');
module.exports = async (req, res) => {
  if (req.session.username) {
    await Comments.create(req.body);
  } else {
    return res.redirect('/home/index');
  }
  res.redirect('/home/article?id=' + req.body.aid);
}