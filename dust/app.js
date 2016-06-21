

var express = require('express'),
  config = require('./config/config');

var app = express();

require('./config/express')(app, config);

// (function sleep(sleepTime) {
//   for(var start = +new Date; +new Date - start <= sleepTime; ) { }
// })(5000)

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
