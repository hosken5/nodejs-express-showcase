var express = require('express');
var router = express.Router();

var superagent = require('superagent') ;
var cheerio = require('cheerio');
var url = require('url');
var eventproxy = require('eventproxy');
/* GET home page. */
var cnodeurl = 'https://cnodejs.org/';

router.get('/', function(req, res) {
    superagent.get("https://cnodejs.org")
        .end(function(err,sres){
            if(err){
                return next(err);
            }
            var ep =  new eventproxy();

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

            ep.after('topic_html',topicurls.length,function(topics){
                topics = topics.map(function(topicPair){
                    var topicUrl = topicPair[0];
                    var topicHtml = topicPair[1];
                    var $= cheerio.load(topicHtml);
                    return ({
                        title:$('.topic_full_title').text().trim(),
                        href:topicUrl,
                        comment1:$('.reply_content').eq(0).text().trim()
                    });
                });
                res.send(topics);
            });

            topicurls.forEach(function(topicurl){
                superagent.get(topicurl).end(function(err,res){
                    console.log('fetch '+topicurl+' successful');
                    ep.emit('topic_html',[topicurl,res.text]);
                });
            });
            console.log(topicurls);
        });
});

module.exports = router;