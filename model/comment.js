const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  // 文章id
  aid: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Article',
  },
  // 用户id
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  time: {
    type: Date,
    default: new Date()
  },
  content: String,
});
const Comments = mongoose.model('Comment', commentSchema);
module.exports = {
  Comments
}