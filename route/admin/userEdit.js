module.exports = (req, res) => {
  let { message } = req.query;
  res.render('admin/user-edit',{message});
}