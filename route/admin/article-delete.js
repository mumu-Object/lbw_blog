const {Article } = require('../../model/article');
module.exports = async (req, res, next) => {
  try {
    await Article.findOneAndDelete({ _id: req.body.id });
  } catch (err) {
    return next(JSON.stringify({ path: '/admin/article', message: err.message }));
  }
  res.redirect('/admin/article');
}