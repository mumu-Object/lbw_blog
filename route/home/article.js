const { Article } = require('../../model/article');
const {Comments } = require('../../model/comment');
module.exports = async (req, res) => {
  let comments = await Comments.find({ aid: req.query.id }).populate('aid').populate('uid');
  comments = comments.reverse();
  // res.send(comments);
  // return;
  const article = await Article.findOne({ _id: req.query.id }).populate('author');
  res.render('home/article', {
    article,
    comments
  });
}