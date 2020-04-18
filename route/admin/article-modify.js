const { Article } = require('../../model/article');
module.exports = async (req, res, next) => {
  // 获取要修改的文章
  const modifyArticle = await Article.findOne({ _id: req.query.id }).populate('author');
  // 渲染修改文章页面
  res.render('admin/article-edit', {
    modifyArticle,
    page: req.query.page,
    isOne: req.query.isOne,
    active: true
  })
}