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
app.use(bodyParser.json({extends: true}));
//parse urlencoded body
app.use(bodyParser.urlencoded({extends: true}));

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
	if (req.query.id) 
	{
		id = req.query.id;
	  imageInfoCollection = imagesController.fetchImageCollection();
	  if (imageInfoCollection[id-1]) {
	  	data = imageInfoCollection[id-1];
	  	htmlString = `<label>Current image id: ${id}</label><div>${data.name}</div><img src="${data.imageLink}"><div>${data.description}</div>`;
	  }
	  else htmlString = `Can't find image with id <b>${id}</b> in database. Max <b>${imageInfoCollection.length}</b>`;
	}
	else {
		htmlString = 
		`
			<form method="GET" action="/image">
				<label>Image id to get: </label>
				<input type="number" name="id">
				<input type="submit" value="Get image">
			</form>
		`;
	}
  res.send(htmlString);
});

app.put('/image', (req, res) => {

});

app.delete('/image', (req, res) => {

});

//mo 1 cai port de chay local
app.listen(6969, (req, res) => {
  console.log('app listen on 6969');
});