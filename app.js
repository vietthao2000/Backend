console.log('Hello nodemon');

const fs = require('fs');
//dung cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('./config.json');

var app = express();

//set public folder public
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({extended: true}));

var connection = mongoose.connect(config.connectionString, (err) => {
  if (err) console.log(err)
  else console.log("Connected");
});

autoIncrement.initialize(connection);

const imagesRouter = require(__dirname + '/modules/api/images/');
app.use('/api/image', imagesRouter);

//mo 1 cai port de chay local
app.listen(config.port, (req, res) => {
  console.log(`app listen on ${config.port}`);
})
