# lbw_blog
黑马程序员系列视频教程博客项目 （提供静态资源页面）

## Blog项目运行所依赖的环境

1. node.js
2. mongoDB

### bcript 第三方模块依赖的其他环境

1. Python 2.x 安装Python2.x版本（比如2.7.10）并且把Python的安装目录设置在path系统环境变量中
2. node-gyp 运行 `npm install -g node-gyp`
3. window-build-tools 运行 `npm install --global-production window-build-tools`（这个第三方模块下载时间比较久，保证安装过程中处于联网状态，只要安装过程中没有红色字体即表示安装成功）

## 项目预览

项目所依赖的环境搭建好后在项目根目录运行 node app.js

默认端口是80端口 您可以在app.js 底部修改listen参数为您所需要监听的端口

启动成功后在 http://localhost/admin/login 访问登录页面



1. 登录页面 

   默认邮箱:admin@qq.com 

   默认用户密码: 123

   提示:服务器启动成功之后把在 model/users.js中的 createUser 函数执行注释掉 (这样以后就不再会打印：`E11000 duplicate key error collection: blog.users index: email_1 dup key: { email: "admin@qq.com" }`)




