const fs = require('fs');
//dung cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('./config.json');
const session = require('express-session');
// const clientRouter = require('./client');
const clientRouter = require('./public');
const cookieParser = require('cookie-parser');

mongoose.Promise = global.Promise;

var app = express();

app.use(session({
	secret: "tellnobody",
	maxAge: 1000*60*60*24*30,
	resave: false,
	saveUninitialized: true
}));

//set public folder public
app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

var connection = mongoose.connect(config.connectionString, (err) => {
	if (err) console.log(err)
	else console.log("Connected");
});

autoIncrement.initialize(connection);

app.use('/', clientRouter);

const imagesRouter = require(__dirname + '/modules/api/images/');
app.use('/api/images', imagesRouter);

const usersRouter = require(__dirname + '/modules/api/users');
app.use('/api/users', usersRouter);

//mo 1 cai port de chay local
app.listen(config.port, (req, res) => {
	console.log(`app listen on ${config.port}`);
})