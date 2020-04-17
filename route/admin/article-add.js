// 引入formidable第三方模块
const formidable = require('formidable');
// 引入path系统模块
const path = require('path');
// 引入文章集合
const { Article } = require('../../model/article');
module.exports = (req, res,next) => {
  // 创建表单解析对象
  const form = new formidable.IncomingForm()
  // 配置文件上传存放路径 建议绝对路径
  form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
  // 保留上传文件后缀 formidable默认不保留后缀
  form.keepExtensions = true;
  // 解析表单 第一个参数为req 第二个为回调函数
  form.parse(req, async (err, fields, files) => {
    // err 参数为错误对象 fields 参数为普通数据类型 files 参数为文件数据类型
    // res.send(files.cover.path.split('public')[1]);
    try {
      await Article.create({
        title: fields.title,
        author: fields.author,
        publishDate: fields.publishDate || new Date(),
        cover: files.cover.path.split('public')[1],
        content: fields.content
      });
    } catch (ex) {
      console.log(ex.message);
      return next(JSON.stringify({ path: '/admin/article-edit', message: ex.message.split('title: ')[1] }));
    }
    // 将页面重定向到
    res.redirect('/admin/article');
  })
}