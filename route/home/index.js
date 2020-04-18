const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
const dateformat = require('dateformat');
module.exports = async (req, res) => {
  const articles = await pagination(Article).find().page(req.query.page).size(2).display(5).populate('author').exec();
  // res.send(articles);
  // return;
  req.app.locals.dateformat = dateformat;
  articles.records.forEach(function (item) {
    let reg = /<\/?.+?\/?>/g
    item.content = item.content.replace(reg, '');
  });
  res.render('home/default', {
    articles
  });
}