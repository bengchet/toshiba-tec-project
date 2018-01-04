var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var index = require('./routes/index');
var api = require('./routes/api');

//database
import mongoose from 'mongoose'
mongoose.Promise = require('bluebird')
mongoose.connect(process.env.DATABASE_URL, { useMongoClient: true }).then(() => {
  console.log('database ready')

  // init agenda
  require('./app/agenda/create')

}).catch(err => {
  console.log(err.toString());
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'ionic/www/assets/icon', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/dashboard', express.static(path.join(__dirname, 'ionic/www')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
app.use('/', index);
app.use('/api', api);

// socket.io
var server = require("http").Server(app);
var io = require("socket.io")(server);

//initialise mqtt socketio bridge with mqtt brokers
let bridge = require('./app/mqtt-socketio-bridge/mqtt-socketio-bridge')(io)
bridge.initialize('13.58.141.26');
bridge.initialize('broker.hivemq.com');
bridge.initialize('cytronpg.no-ip.org');
bridge.initialize(); //localhost

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = { app:app, server: server };
