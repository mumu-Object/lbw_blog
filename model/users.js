const mongoose = require('mongoose');
// 引入bcrypt第三方模块
const bcrypt = require('bcrypt');
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
    unique: true,
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

async function createUser() {
  // 生成随机字符串 参数的值越大 字符串复杂度越高
  const salt = await bcrypt.genSalt(10);
  // 使用随机字符串进行加密 第一个参数为原文密码 第二个参数为生成的随机字符串
  const pass = await bcrypt.hash('123', salt);
  // 创建默认用户
  const user = await Users.create({
    username: 'libiwei',
    email: '2781574046@qq.com',
    password: pass,
    role: 'admin',
    state: 0
  })
}
// createUser();


// 导出用户集合
module.exports = {
  Users
}