var express = require('express') ;
var router = express.Router()  ;
var logger = require('../lib/logger');


module.exports = function (app) {
    app.use('/', router);
};


router.get('/testlog',function (req,res,next) {
    logger.debug("debug.........");
    logger.info('info', 'Hello distributed log files!');
    logger.log("log");
    logger.error("error",{'error':'sdfdsf'}) ;
    res.send({'a':'b'});
});
