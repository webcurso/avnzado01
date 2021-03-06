var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var quienesSomos = require('./routes/quienesSomos');
var loginRouter = require('./routes/login');

// COnexion a MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Conectado")
});

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(session({
  secret: 'palabraClave',
  resave: false,
  saveUninitialized: true,
  name: 'Mi_Cookie',
  cookie: { maxAge: 60000}
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

var validation = function (req, res, next) {
  if(req.session.username){
    next();    
  }else{
    res.redirect('/login');
  }
};

app.use(myLogger);
app.use('/login', loginRouter);

//app.use(validation);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quienessomos', quienesSomos);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
