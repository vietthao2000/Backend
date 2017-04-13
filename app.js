const fs = require('fs');
const express = require('express');

var app = express();

getJSON = (fileName) => {
	var data = fs.readFileSync(fileName,'utf-8');
	var json = JSON.parse(data);
	return json;
}

app.use(express.static(__dirname + '/public'));

app.get('/image/get', (req , res) => {
	json = getJSON('imageData.json');
	var html = "<html><head><title>All images</title></head><body>";

	json.forEach( function(element, index) {
		var div = "<div>";
		var name = "<b>Name: </b>"+element.name+"</br>";
		var img = "<img src='"+element.link+"'/></br>";
		var description = "<b>Description: </b>"+element.description+"</br>";
		div += name + description +img + "</div>";
		console.log(div);
		html += div;
	});

	html += "</body></html>";
	res.send(html);
});

app.get('/image/add', (req, res) => {
	if (req.query && req.query.name && req.query.link && req.query.description) {
		json = getJSON('imageData.json');

		image = {
			name: req.query.name,
			link: req.query.link,
			description: req.query.description
		}

		json.push(image);

		fs.writeFileSync('imageData.json',JSON.stringify(json));
		res.send('Success');
		return;
	}
	res.send('Not enough query data');
});

app.listen(6969, (req, res) => {
	console.log('Listening on port 6969');
});