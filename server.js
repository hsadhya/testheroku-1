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






var port = Number(process.env.PORT || 3000);
app.listen(port);