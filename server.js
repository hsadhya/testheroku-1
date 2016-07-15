var express = require("express");
var mysql = require('mysql');
var app = express();

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


var port = Number(process.env.PORT || 3000);
app.listen(port);