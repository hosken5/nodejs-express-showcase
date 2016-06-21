var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'dust'
    },
    port: process.env.PORT || 3500,
  },

  test: {
    root: rootPath,
    app: {
      name: 'dust'
    },
    port: process.env.PORT || 3500,
  },

  production: {
    root: rootPath,
    app: {
      name: 'dust'
    },
    port: process.env.PORT || 3500,
  }
};

module.exports = config[env];
