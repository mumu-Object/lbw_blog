module.exports = (req, res) => {
  res.render('admin/article-edit',{active: true,message: req.query.message ? req.query.message : ''});
}