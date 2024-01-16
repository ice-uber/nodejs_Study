const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {url} = require('./config/mongodbConfig')

const session = require('express-session')
const mongoStore = require('connect-mongo')

var app = express();

//设置express——session中间件
app.use(session({
  name:'sid', //设置cookie的name
  secret:'atguigu', //设置参与加密的字符串
  saveUninitialized:false, // 是否为每次请求都设置一个cookie用来存储session的id
  resave:true, // 是否在每次请求时重新获取保存session 20分钟
  store:mongoStore.create({
    mongoUrl: url
  }),
  cookie:{
    httpOnly:true,
    maxAge:1000 * 60 * 5 //sessionId过期时间
  }
}))

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
