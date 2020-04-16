const { Users } = require('../../model/users');
module.exports = async (req, res) => {
  // 数据分页 
  // 1.获取到当前页
  let page = req.query.page || 1;
  // 每页显示的数据条数
  let pageSize = 10;
  // 查询用户数据的总量
  let count = await Users.countDocuments({});
  // 总页数 数据总数 / 每页数据条数 = 总页数
  let total = Math.ceil(count / pageSize);
  // 页码对应开始查询位置
  let start = (page - 1) * pageSize;
  const users = await Users.find().limit(pageSize).skip(start);
  res.render('admin/user', {
    users,
    page,
    total,
    count
  });
}