const { Article } = require('../../model/article');
module.exports = async (req, res) => {
  const article = await Article.findOne({ _id: req.query.id }).populate('author');
  res.render('home/article', { article });
}