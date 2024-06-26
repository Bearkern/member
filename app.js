const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));
app.use(session({ secret: 'mysupersecret', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// routes setup
const index = require('./routes/index');
const login = require('./routes/login');
const messageBoard = require('./routes/messageBoard');
const signUp = require('./routes/signUp');
const user = require('./routes/user');

app.use('/', index);
app.use('/login', login);
app.use('/messageBoard', messageBoard);
app.use('/signUp', signUp);
app.use('/user', user);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
