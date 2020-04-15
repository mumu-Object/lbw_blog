// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 链接数据库
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('连接MongoDB数据库成功'))
  .catch((err) => console.log(err.name));