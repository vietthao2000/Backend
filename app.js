const fs = require('fs');
//dung express
const express = require('express');
const bodyParser = require('body-parser');

const imagesController = require(__dirname + '/modules/images/imagesController');

var app = express();

//set public folder public
//app.use(urlencoded)
app.use(express.static(__dirname + '/public'));
//parse json
app.use(bodyParser.json({extended: true}));
//parse urlencoded body
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('./public/addImage.html');
});

app.post('/image', (req, res) => {
  //doc du lieu tu file imageData
  var imageInfoCollection = imagesController.fetchImageCollection();

  //khai bao object
  var imageInfo = {
    name : req.body.name,
    imageLink : req.body.imageLink,
    description : req.body.description
  }

  //push data moi vao collection
  imageInfoCollection.push(imageInfo);

  //luu lai vao file
  imagesController.saveImageCollection(imageInfoCollection);
  //bao thanh cong
  res.send('Success');
})

app.get('/image', (req,res) => {
	//console.log(req.query.id);
	var htmlString = "";
	if (req.query.id && req.query.id==="all") {
		imageInfoCollection = imagesController.fetchImageCollection();

	  imageInfoCollection.forEach((data) => {
	    htmlString += `<div>${data.name}</div><img src="${data.imageLink}"><div>${data.description}</div>`;
	  });
	}
	else if (req.query.id) 
	{
		id = req.query.id;
	  imageInfoCollection = imagesController.fetchImageCollection();
	  if (imageInfoCollection[id-1]) {
	  	data = imageInfoCollection[id-1];
	  	htmlString =`<label>Current image id: ${id}</label><div>${data.name}</div><img src="${data.imageLink}"><div>${data.description}</div>`;
	  }
	  else htmlString = `Can't find image with id <b>${id}</b> in database. Max <b>${imageInfoCollection.length}</b>`;
	}
	else {
		htmlString +=
		`
			<form method="GET" action="/image">
				<label>Image id to get: </label>
				<input type="number" name="id">
				<input type="submit" value="Get image">
			</form>
			<form method="GET" action="/image">
				<input type="text" name="id" value="all" hidden>
				<input type="submit" value="Get all images">
			</form>
		`;
	}
  res.send(htmlString);
});

app.put('/image', (req, res) => {
	console.log(req.body);
	if (req.body && req.body.id) {
		var imageInfoCollection = imagesController.fetchImageCollection();
		if (imageInfoCollection[req.body.id-1]) {
			if (req.body.name) imageInfoCollection[req.body.id-1].name = req.body.name;
			if (req.body.imageLink) imageInfoCollection[req.body.id-1].imageLink = req.body.imageLink;	
			if (req.body.description) imageInfoCollection[req.body.id-1].description = req.body.description;
		};
		imagesController.saveImageCollection(imageInfoCollection);
		res.send("Success");
	}
	else {
		res.send("Not enough data provided");
	}
});

app.delete('/image', (req, res) => {
	if (req.query && req.query.id) {
		var imageInfoCollection = imagesController.fetchImageCollection();
		if (imageInfoCollection[req.query.id-1]) {
			imageInfoCollection.splice(req.query.id-1,1);
			imagesController.saveImageCollection(imageInfoCollection);
			res.send("Success");
		}
		else {
			res.send(`Can't delete image with id <b>${req.query.id}</b>. Max <b>${imageInfoCollection.length}</b>`);
		}
	}
	else {
		res.send("Id not specified");
	}
});

//mo 1 cai port de chay local
app.listen(6969, (req, res) => {
  console.log('app listen on 6969');
});