const mongoose = require('mongoose');
// 创建用户集合规则
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username 字段是必填的'],
    minlength: [2, 'username 字段最小长度是2个字符'],
    maxlength: [16, 'username 字段最大长度是16个字符']
  },
  email: {
    type: String,
    // unique 设置为true可以保证字段不重复
    unique: [true, '此 email 字段已存在'],
  },
  password: {
    type: String,
    required: [true, 'password 字段是必填的']
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'normal'],
      message: 'role 字段值应为 admin 或 normel'
    },
    required: [true, 'password 字段是必填的']
  },
  // 字段值为0 启用状态 字段值为1 禁用状态
  state: {
    type: Number,
    default: 0
  }
});
// 创建集合
const Users = mongoose.model('Users', userSchema);
// 创建默认用户
// Users.create({
//   username: 'libiwei',
//   email: '2781574046@qq.com',
//   password: '123',
//   role: 'admin',
//   state: 0
// }).then(() => console.log('创建默认用户成功成功'))
//   .catch(err => {
//   console.log(err.message)
// })

// 导出用户集合
module.exports = {
  Users
}