const formidable = require('formidable');
const path = require('path');
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
    let modifyObj = fields;
    modifyObj.cover = files.cover.path.split('public')[1];
    try {
      const modifyArticle = await Article.findOne({ _id: fields.id });
      await Article.updateOne(modifyArticle, modifyObj);
    } catch (err) {
      // 将验证错误交给错误处理中间件处理
      return next(JSON.stringify({
        path: `/admin/user-edit?id=${req.query.id}&`,
        message: '修改的' + ex.message
      }));
    }
    res.redirect('/admin/article?page=' + fields.page + '&isOne=' + fields.isOne);
  });
  
}