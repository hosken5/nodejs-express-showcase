var express = require('express');
var router = express.Router();



router.get('/', function(req, res) {
    // console.log("hello");
    // var isVisit = req.cookies.isVisit ;
    // isVisit || res.cookie('isVisit',1,{maxAge:60*1000}) ;

    res.render('login');
});

module.exports = router;
