const express = require('express');
const serial = require('./Serial');
const db = require('./Db');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

//SERVER CONFIG

const port = 3333;

var app = express();

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile); 
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function(){
	console.log("Servidor on: http:/localhost:"+port);
});

//GET METHODS

app.get("/", function(req,res){
	res.redirect("/cmd");
});

app.get("/cmd", function(req,res,next){
	res.render('Index.html');
});

app.get('/log', function(req, res){
	res.send(serial.Logs);
	res.end();
});

app.get('/login', function(req, res){
	var id = req.query.id;
	db.verifyLogin(id,
	function(){
		res.send(true);
		res.end();
		},
	function(){
		res.send(false);
		res.end();
	});
});

app.get("/teste", function(req,res){
	res.render('Delify/Restaurant.html');
});

//POST METHODS

app.post('/cmd', function(req, res){
	var id = req.cookies.userId;
	db.verifyLogin(id,
	function(){
		serial.cmd(req.body.value,req.ip);
		db.log(req.cookies.userId,req.body.value,serial.log);
		},
	function(){
		console.log(req.ip+" tentou burlar as regras!");
	});
});

app.post('/login' , function(req, res){
	db.loginUser(req,res);
});