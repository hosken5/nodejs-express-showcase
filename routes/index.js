var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    console.log("hello");
    var isVisit = req.cookies.isVisit ;
    isVisit || res.cookie('isVisit',1,{maxAge:60*1000}) ;

    res.render('index', {
        title: 'Express',
        isVisit:isVisit
    });
});

module.exports = router;
