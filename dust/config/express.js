var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
// var exphbs  = require('express-handlebars');
var  kleiDust = require('klei-dust');
var dust = require('dustjs-linkedin');
var engines = require('consolidate');


//dust 自定义函数
dust.helpers.substr = function (chunk, ctx, bodies, params) {
  // Get the values of all the parameters. The tap function takes care of resolving any variable references
  // used in parameters (e.g. param="{name}"
  var str = dust.helpers.tap(params.str, chunk, ctx),
    begin = dust.helpers.tap(params.begin, chunk, ctx),
    end = dust.helpers.tap(params.end, chunk, ctx),
    len = dust.helpers.tap(params.len, chunk, ctx);
  begin = begin || 0; // Default begin to zero if omitted
  // Use JavaScript substr if len is supplied.
  // Helpers need to return some value using chunk. Here we write the substring into chunk.
  // If you have nothing to output, just return chunk.write("");
  if (!(typeof(len) === 'undefined')) {
    return chunk.write(str.substr(begin,len));
  }
  if (!(typeof(end) === 'undefined')) {
    return chunk.write(str.slice(begin,end));
  }
  return chunk.write(str);
}


kleiDust.setOptions({
  // extension:'dust'
  useHelpers:true
});
// kleiDust.debugLevel = 'DEBUG' ;



module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  if (app.locals.ENV_DEVELOPMENT) {
    dust.debugLevel = "INFO";
  }

  // app.engine('handlebars', exphbs({
  //   layoutsDir: config.root + '/app/views/layouts/',
  //   defaultLayout: 'main',
  //   partialsDir: [config.root + '/app/views/partials/']
  // }));
  app.engine('dust', engines.dust);
  app.engine('ejs', engines.ejs);

  // app.engine('ejs',ejs);

  app.set('views', config.root + '/app/views');
  //app.set('view engine', 'handlebars');
  app.set('view engine', 'dust');
  app.set('view options', {layout: false});

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
