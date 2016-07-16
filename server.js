var express = require("express");
var mysql = require('mysql');
var app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');
var useragent = require('express-useragent');
var json ={};

app.use(useragent.express());
app.use(bodyParser.urlencoded({
  extended: true
}));// call methods separate

app.use(express.static('public'));
app.use(bodyParser.json());


//////////////////////////////////////////
var connection = mysql.createConnection({
//connection parameters
host:'nj5rh9gto1v5n05t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
user:'t8gmzgkonkg6jl3h',
password:'f9uflntdn8jmsvlh',
database:'x54xfwbyrabdve9u',
port:3306
});

connection.connect(function(err){
	if(err){
		console.log('Error connection');
		return;
		}
	else{
		console.log('Connected as id');
	}
});

///////////////////////////////////////////
app.get('/', function (req, res) {
   res.sendFile(__dirname + '/public/index.html');
});


app.post('/detectbrowser',function(req,res){

var userdata = { data:req.useragent};
var query = connection.query('INSERT INTO `useragent` SET?', {data:JSON.stringify(userdata), id: req.body.memberID}, function(err,result){
  if (err) throw err;
  else 
     res.sendFile(__dirname + '/public/consentform.html');
});
console.log(query.sql);
})





//Posting the data from public/review/reviewpage
app.post('/insertdata', function(req,res){

var reviewdata  = {id: req.body.memberID,
            gender: req.body.optradio,
            overall: req.body.overall,
            cleanliness: req.body.cleanliness,
            sleepquality: req.body.sleepQuality,
            rooms: req.body.rooms,
            service: req.body.service,
            value: req.body.valuess
            };

var query = connection.query('INSERT INTO relevance SET ?', reviewdata, function(err, result) {
  if(err) throw err;
    else
     res.sendFile(__dirname + ["/public/red/red.html","/public/grey/grey.html"][Math.floor(Math.random()*2)]);
});
console.log(query.sql);  

})



//Posting the data from treatments page
app.post('/treatment', function(req,res,next){

var treatmentdata = {

  memberid: req.body.memberID,
  treatment: req.body.treatment,
  answer: req.body.score
};


var query = connection.query('INSERT INTO treatment SET ?', treatmentdata, function(err, result) {
  if(err) throw err;
    else
    res.sendFile(__dirname + '/public/colorTest/index.html');  
});
console.log(query.sql); 

})


//Posting the data from colortest  page

app.post('/colorblind', function(req,res){

var colordata  = {memberid: req.body.memberID,
            response1: req.body.colorboxanswer1,
            response2: req.body.colorboxanswer2,
            response3: req.body.colorboxanswer3,
            response4: req.body.colorboxanswer4,
            response5: req.body.colorboxanswer5,
            response6: req.body.colorboxanswer6,
            response7: req.body.colorboxanswer7,
            response8: req.body.colorboxanswer8,
            response9: req.body.colorboxanswer9
            };

var query = connection.query('INSERT INTO colorblind SET ?', colordata, function(err, result) {
   if(err) throw err;
  res.send('<html><h3></br></br>Thank you for your participation in this experiment.</br> The experiment is now concluded.</h3></html>');  
   //console.log('success!')
   //res.redirect('/colorblind');
});
console.log(query.sql);  

})

//////////////////////////////////////////
var port = Number(process.env.PORT || 3000);
app.listen(port);