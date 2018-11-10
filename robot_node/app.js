var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var robot = require('./routes/api_robot');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var swig = require('swig'); //加载html模板处理模块

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//配置应用使用的模板
app.engine('html', swig.renderFile);
//注册所使用的模板引擎，第一个参数必须是view engine
app.set('view engine', 'html');
//设置模板文件存放的目录，第一个参数必须是views
//第二个参数是路径目录
app.set('views', './app/views');

// uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function (req, res, next) {
  res.io = io;
  req.io = io;
  next();
});

//bodyParser 相关参数设置
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/api/robot', robot); // robot的api路由

// app.set('port', 3000);
//Server's IP address
app.set("ipaddr", "127.0.0.1");
require('./app/router')(app)
//Server's port number
app.set("port", 3000);
var participants = [];
io.on("connection", function (socket) {
  socket.on("newUser", function (data) {
    participants.push({ id: data.id, name: data.name });
    io.sockets.emit("newConnection", { participants: participants });
  });
});

/**
 * Create HTTP server.
 */

// var server = require('../app').server;

/**
 * Listen on provided port, on all network interfaces.
 */

//Start the http server at port and IP defined before
server.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

// module.exports = {app: app, server: server};
