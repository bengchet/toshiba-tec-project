var winston = require('winston');
require('winston-daily-rotate-file');

var transport = new (winston.transports.DailyRotateFile)({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m'
});

transport.on('rotate', function(oldFilename, newFilename) {
  // do something fun
});

var logger = new (winston.Logger)({
  transports: [
    transport
  ]
});

module.exports = logger;
