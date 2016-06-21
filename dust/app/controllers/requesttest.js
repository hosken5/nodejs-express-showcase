var express = require('express'),
  rp= require('request-promise')
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/requestget', function (req, res, next) {
  rp.get({
    url:"http://localhost:8088/requestget",
    qs:{a:"你",b:"好"},
    headers:{'Content-Type':'application/json;charset=utf-8'}
  })
  .then(function(data){
     console.log(data);
      res.send(data);
  })
  .catch(function(data){
      res.send(data);
  });
});

router.post('/requestpost', function (req, res, next) {
  console.log('requestgetrequestgetrequestgetrequestget');
  rp.post({
      url:"http://localhost:8088/requestpos",
      qs:{a:"你",b:"好"}
    })
    .then(function(data){
      console.log(data);
      res.send(data);
    })
    .catch(function(data){
      next(data);
      // res.send(data);
    });
  // res.send({'message':'你好'});
});
