var express = require('express');
var router = express.Router();

var superagent = require('superagent') ;
var cheerio = require('cheerio');
var url = require('url');
/* GET home page. */
var cnodeurl = 'https://cnodejs.org/';

router.get('/', function(req, res) {
    superagent.get("https://cnodejs.org")
        .end(function(err,sres){
           if(err){
               return next(err);
           }
            // console.log(sres);
            var $ = cheerio.load(sres.text);
            var items = [] ;
            var topicurls = [];
            $('#topic_list .topic_title').each(function(iex,element){
                var $element = $(element);
                var href = url.resolve(cnodeurl,$element.attr("href"));
                topicurls.push(href);
                items.push({
                    title:$element.attr('title'),
                    href:$element.attr('href')
                });
            });
            console.log(topicurls);
            res.send(items);
        });
});

module.exports = router;
