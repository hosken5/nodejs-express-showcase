var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'debug'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            level: 'error',
            filename: 'error.log'
        })
    ]
});

module.exports = logger  ;