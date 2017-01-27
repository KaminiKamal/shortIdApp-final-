var express = require('express');
var router = express.Router();
var ShortUrl = require("../models/shortgen"); 
var shortid = require('shortid');

var authenticate = function (req, res, next) {
     var str=req.body.originalurl;
    var n = str.search (/http|https|localhost|www/);
    if ( n==0 ){
      next();
    }
    else{
      return res.send("Please enter valid url");
    }
    //document.getElementById("demo").innerHTML = n;
}

router.get('/index',function (req, res){
  res.render('index1',{title : 'Welcome to express'});
});
router.get('/', function (req, res, next) {
   
  res.render('index');
});





router.post('/form', authenticate, function (req, res) {
           var url = req.body.originalurl;
           //console.log(url);
           var q = shortid.generate();
           //var newid = shortid.generate();

           var info = {oldurl :url, shorturl: q};
           console.log(info);
           //console.log(shortid.generate());
           var query = ShortUrl(info);
           query.save(function (err, data){
           	if (err){
              console.log("error");
            }
           	else{
               console.log(data);
              console.log("data sent");
           	res.send(data);
            }
           });
           console.log(q);
           //res.redirect('/page1');
});

router.get('/:url', function(req, res, next) {
 ShortUrl.findOne({ shorturl : req.params.url})
  .exec(function(err,url){
  	return res.render('list',{data:url})
  });
});
 

module.exports = router;


module.exports = router;
