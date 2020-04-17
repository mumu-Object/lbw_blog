const mongoose = require('mongoose');
// 创建文章集合规则
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [4, '标题 字段最小长度是4个字符'],
    maxlength: [30, '标题 字段最大长度是20个字符'],
    required: [true, '标题 字段是必须的']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, '无效的作者id']
  },
  publishDate: {
    type: Date,
    default: new Date()
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type: String
  }
});
// 创建文章集合
const Article = mongoose.model('Article', articleSchema);
// 导出文章集合
module.exports = {
  Article
}