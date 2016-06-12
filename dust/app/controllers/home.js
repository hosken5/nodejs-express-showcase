var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var articles = [new Article(), new Article()];
    // res.render('index', {
    //   title: 'Generator-Express MVC',
    //   articles: articles
    // });
    res.render('child',{
        person:{
          age:23,
          name:'Harvey',
          sex:'male'
        },
        name:'',
        title:'dusttest',
        "names" : [{ "name": "Larry" },{ "name": "Curly" },{ "name": "Moe" }],
      "anotherName": "root2",
      "A":{
        "name":"Albert",
        "B":{
          "name":"Bob"
        }
      },
    "A2":
      {names:
        ["Albert", "Alan"]
      },
      "A3":{
      "type":"Student"
    },  homeAddress: {
        street: "1 Main St",
        city: "Anytown"
      },
      courseName:'CS201',
      foo:'3',
      friends:["ni",'niu','bi'],
      rows:['水电费水电费','魄力','水电电费','sdfsfs'],
      name:''
    });
});
