const express = require('express');
const Router = express.Router();
const imagesController = require('./imagesController');
const interactionController = require('./interactionController');
const rolesModel = require('../users/rolesModel');
// const session = require('express-session');

var verifyPermission = (req, res, next, permission) => {
	if (req.session.permissions[permission]===1) {
		next();
	}
	else {
		res.send({err:"No permission"});
	}
};

var assignPermission = (req, res, next) => {
	if (req.session.user) {
		rolesModel.findOne({"role": req.session.user.role})
		.then(result => {
			req.session.permissions = result.permissions.images;
			next();
		});
	}
	else {
		rolesModel.findOne({"role": "guest"})
		.then(result => {
			req.session.permissions = result.permissions.images;
			next();
		});
	}
};

Router.use(assignPermission);

Router.post('/', (req, res, next) => {verifyPermission(req, res, next, 'write')},
	(req, res) => {
		try {
			//khai bao object
			var imageInfo = {
				name : req.body.name,
				imageLink : req.body.imageLink,
				description : req.body.description,
				creator: req.session.user.id
			}

			imagesController
				.addImage(imageInfo)
					.then((result) => {res.send(result)});
		} catch (e) {
			res.send("An error occured");
			console.log(e);
		};
	});


Router.get('/', (req, res, next) => {verifyPermission(req, res, next, 'read')}, 
	(req, res) => {
		try {
			if (req.query.id) {
				// interactionController.increaseViewCountById(req.query.id).then((result) => {});
				imagesController
					.fetchImageCollectionById(req.query.id)
						.then((result) => {res.send(result);});
			}
			else if (req.query.s) {
				// interactionController.increaseViewCountByName(req.query.s).then((result) => {});
				imagesController
					.searchImageCollection(req.query.s)
						.then((result) => {res.send(result);});
			}
			else {
				interactionController
					.increaseAllViewCount()
						.then((result) => {});

				imagesController
					.fetchImageCollection()
						.then((result) => {res.send(result);});
			}
		} catch (e) {
			res.send("An error occured");
			console.log(e);
		};
	})

Router.put('/', (req, res, next) => {verifyPermission(req, res, next, 'update')},
	(req, res) => {
		try {
			if (req.body.id) {
				var newData = {
					name: req.body.name,
					imageLink: req.body.imageLink,
					description: req.body.description
				};
				
				imagesController
					.updateImageCollectionById(req.body.id, newData)
						.then((result) => {res.send(result)});
			}
			else if (req.body.name) {
				var newData = {
					name: req.body.name,
					imageLink: req.body.imageLink,
					description: req.body.description
				};
				
				imagesController
					.updateImageCollectionByName(req.body.name, newData)
						.then((result) => {res.send(result)});	
			}
			else res.send("Not enough data");
		} catch (e) {
			res.send("An error occured");
			console.log(e);
		};
	})

Router.delete('/', (req, res, next) => {verifyPermission(req, res, next, 'delete')},
	(req, res) => {
		try {
			if (req.body.id)
				imagesController
					.deleteImageCollectionById(req.body.id)
						.then((result) => {res.send(result)});
			else res.send("Not enough data");
		} catch (e) {
			res.send("An error occured");
			console.log(e);
		};
	});

Router.post('/like', (req, res, next) => {verifyPermission(req, res, next, 'write')},
	(req, res) => {
		try {
			if (req.body.id && req.body.likeBy)
				interactionController
					.addLike(req.body.id, req.body.likeBy)
						.then((result) => {res.send(result)});
			else res.send("Not enough data");
		} catch(e) {
			res.send("An error occured");
			console.log(e);
		}
	});

Router.delete('/like', (req, res, next) => {verifyPermission(req, res, next, 'write')},
	(req, res) => {
		try {
			if (req.body.id && req.body.likeBy) 
				interactionController
					.removeLike(req.body.id, req.body.likeBy)
						.then((result) => {res.send(result)});
			else res.send('Not enough data');
		} catch (e) {
			res.send("An error occured");
			console.log(e);
		}
	});

Router.post('/comment', (req, res, next) => {verifyPermission(req, res, next, 'write')},
	(req, res) => {
		try {
			if (req.body.id && req.body.content && req.body.commentBy) 
				interactionController.addComment(
					req.body.id, 
					req.body.content, 
					req.body.commentBy
				).then((result) => {res.send(result)});
			else res.send("Not enough data");
		} catch(e) {
			res.send("An error occured");
			console.log(e);
		}
	});

Router.delete('/comment', (req, res, next) => {verifyPermission(req, res, next, 'read')},
	(req, res) => {
		try {
			if (req.body.id && req.body.commentHash) 
				interactionController
					.removeComment(req.body.id, req.body.commentHash)
						.then((result) => {res.send(result)});
			else res.send("Not enough data");
		} catch(e) {
			res.send("An error occured");
			console.log(e);
		}
	});

module.exports = Router;