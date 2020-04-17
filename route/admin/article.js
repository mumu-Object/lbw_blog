// 引入文章集合
const { Article } = require('../../model/article');
// 引入dateformat
const dateformat = require('dateformat');
// 引入mongoose数据分页模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
  // 查找全部文章还有文章对应的作者
  // page() 参数指定当前页
  // size() 每页多少条数据
  // display() 
  req.app.locals.dateformat = dateformat;
  const articles = await pagination(Article).find().page(req.query.page).size(1).display(5).populate('author').exec();
  // 渲染用户列表
  // res.send(articles);
  // return;
  res.render('admin/article', {
    active: true,
    articles
  });
}