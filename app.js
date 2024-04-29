/**
 * The file to start a server
 *
 */

var express = require('express');
var path = require('path');
var session = require('express-session');
var user_routes = require('./app/routes/user.server.routes');
var chara_routes = require('./app/routes/chara.server.routes');
var adm_routes = require('./app/routes/adm.server.routes');
var contribution_routes = require('./app/routes/contribution.server.routes');
var app = express();

// 这些中间件用来解析请求体
app.use(express.json()); // 用于解析 application/json 类型的数据
app.use(express.urlencoded({ extended: true })); // 用于解析 application/x-www-form-urlencoded 类型的数据


app.use(session({
  secret: 'your_secret_key', // 用来对session id相关的cookie进行签名
  saveUninitialized: true, // 是否自动保存未初始化的会话，建议false
  resave: false, // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 3600000 // 设置 session 的有效时间，单位毫秒
  }
}));
app.set('views', path.join(__dirname,'/app/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

app.use('/user',user_routes)
app.use('/chara',chara_routes)
app.use('/adm', adm_routes)
app.use('/contribution', contribution_routes)

app.get('/', function(req, res) {
    res.render("Login.ejs");
});


app.listen(3000,'0.0.0.0' ,function () {
	console.log('Revision app listening on port 3000!')
});
	
module.exports = app;