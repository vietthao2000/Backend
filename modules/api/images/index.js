const express = require('express');
const Router = express.Router();
const imagesController = require('./imagesController');
const interactionController = require('./interactionController');

Router.post('/', (req, res) => {
	try {
		//khai bao object
		var imageInfo = {
			name : req.body.name,
			imageLink : req.body.imageLink,
			description : req.body.description
		}

		imagesController.addImage(imageInfo).then((result) => {res.send(result)});
	} catch (e) {
		console.log(e);
	};
});


Router.get('/', (req,res) => {
	try {
		if (req.query.id) {
			interactionController.increaseViewCountById(req.query.id).then((result) => {});
			imagesController.fetchImageCollectionById(req.query.id).then((result) => {res.send(result)});
		}
		else if (req.query.name) {
			interactionController.increaseViewCountByName(req.query.name).then((result) => {});
			imagesController.fetchImageCollectionByName(req.query.name).then((result) => {res.send(result)});
		}
		else {
			interactionController.increaseAllViewCount().then((result) => {});
			imagesController.fetchImageCollection().then((result) => {res.send(result)});
		}
	} catch (e) {
		console.log(e);
	};
})

Router.put('/', (req, res) => {
	try {
		if (req.body.id) {
			var newData = {
				name: req.body.name,
				imageLink: req.body.imageLink,
				description: req.body.description
			};
			
			imagesController.updateImageCollectionById(req.body.id, newData).then((result) => {res.send(result)});
		}
		else if (req.body.name) {
			var newData = {
				name: req.body.name,
				imageLink: req.body.imageLink,
				description: req.body.description
			};
			
			imagesController.updateImageCollectionByName(req.body.name, newData).then((result) => {res.send(result)});	
		}
		else res.send("Not enough data");
	} catch (e) {
		console.log(e);
	};
})

Router.delete('/', (req, res) => {
	try {
		if (req.body.id)
			imagesController.deleteImageCollectionById(req.body.id).then((result) => {res.send(result)});
		else res.send("Not enough data");
	} catch (e) {
		console.log(e);
	};
});

Router.post('/like', (req, res) => {
	try {
		if (req.body.id && req.body.likeBy)
			interactionController.addLike(req.body.id, req.body.likeBy)
			.then((result) => {res.send(result)});
		else res.send("Not enough data");
	} catch(e) {
		console.log(e);
	}
});

Router.delete('/like', (req, res) => {
	try {
		if (req.body.id && req.body.likeBy) 
			interactionController.removeLike(req.body.id, req.body.likeBy)
				.then((result) => {res.send(result)});
		else res.send('Not enough data');
	} catch (e) {
		console.log(e);
	}
});

Router.post('/comment', (req, res) => {
	try {
		if (req.body.id && req.body.comment && req.body.commentBy) 
			interactionController.addComment(
				req.body.id, 
				req.body.comment, 
				req.body.commentBy
			).then((result) => {res.send(result)});
		else res.send("Not enough data");
	} catch(e) {
		console.log(e);
	}
});

Router.delete('/comment', (req, res) => {
	try {
		if (req.body.id && req.body.commentHash) interactionController.removeComment(req.body.id, req.body.commentHash)
			.then((result) => {res.send(result)});
		else res.send("Not enough data");
	} catch(e) {
		console.log(e);
	}
});

module.exports = Router;