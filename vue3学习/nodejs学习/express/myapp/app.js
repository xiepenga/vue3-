var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require("./routes/api")
var fileRouter = require("./routes/file")
var session = require("express-session")
const MongoStore = require("connect-mongo");
const Jwt = require('./utils/Jwt');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  name: "xiepeng",
  secret: "darewrw",
  resave: true,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false
  },
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/xiepeng_session', //新创建了一个数据库
    ttl: 1000 * 60 * 60 // 过期时间
  })
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (req.url.includes('login')) {
    next()
    return
  }
  const authorization = req.headers['authorization'] ? req.headers['authorization'] : false
  if (authorization) {
    const token = authorization.split(' ')[1]
    const paylaod = Jwt.verify(token)
    console.log(paylaod)
    if (paylaod) {
      const newToken = Jwt.sign({ _id: paylaod._id, username: paylaod.username }, '1000s')
      res.header('authorization', newToken)
      next()
    } else {
      res.status(401).send({
        code: 401,
        msg: '请重新登录'
      })
    }
  } else {
    next()
  }

})
app.use('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  if (req.method === 'OPTIONS') {
    console.log(12233)
    res.status(200).end()
    return
  }else{
    next()
  }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter),
  app.use('/file', fileRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
