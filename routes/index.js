var express = require('express');
var router = express.Router();
var ShortUrl = require("../models/shortgen");
var shortid = require('shortid');
var keys = require('./twiliokeys');
var  bodyParser = require('body-parser');

var authenticate = function (req, res, next) {
     var str=req.body.originalurl;
    var n = str.search (/http|https|localhost|www/);
    if ( n == 0 ){
      next();
    }
    else{
      return res.json({
        error : true ,
        reason : "Please enter valid url"
      });
    }
    //document.getElementById("demo").innerHTML = n;
}

// router.get('/index',function (req, res){
//   res.render('index1',{title : 'Welcome to express'});
// });
router.get('/', function (req, res, next) {

  res.render('index');
});
// router.get('/list', function (req, res, next) {
//
//   res.render('list');
// });


router.post('/sendsms', bodyParser.json(), (req, res) => {console.log("server", req.body);
  var client = require('twilio')(keys.sid, keys.token);
  client.sendMessage({
    to: '+91'+req.body.recipient,
    from: '+14024137673',
    body: req.body.message
  }, function (err, responseData) {
    if (!err) {
      res.json({"From": responseData.from, "Body": req.body, "status": 200});
    }
    else{
      res.json({"error" : "failed to send the OTP"})
    }
  });
});


router.post('/form', authenticate, function (req, res) {
           var url = req.body.originalurl;
           //console.log(url);
           var q = shortid.generate();
           //var newid = shortid.generate();
           //console.log(q);

           var info = {
             oldurl :url ,
              shorturl: q
            };
           //console.log(info);
           //console.log(shortid.generate());
           var query = ShortUrl(info);
           query.save(function (err, data){
           	if (err){
              //console.log("error");
            }
           	else{
              // console.log(data);
              //console.log("data sent");
           	  res.send(data);
            }
           });
           //console.log(q);
           //res.redirect('/page1');
});

router.get('/:url', function(req, res, next) {
 ShortUrl.findOne({ shorturl : req.params.url})
  .exec(function(err,data){
    if(err || data === null){
      res.send('ERROR');
    }else{
      var a = "http://"+data.oldurl;
      return res.redirect(a);

    }
//  	console.log(data);
  });
});


module.exports = router;
