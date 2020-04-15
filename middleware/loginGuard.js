const guard = (req, res, next) => {
  // 判断用户访问的是否是登录页面 判断用户的登录状态 如果是登录的 将请求放行 如果不是登录的 将请求重定向到登录页面
  if (req.url != '/login' && !req.session.username) {
    res.redirect('/admin/login');
  } else {
    // 将请求放行
    next();
  }
};
module.exports = guard;