const express = require('express');
const Router = express.Router();
const usersController = require('./usersController');

Router.post('/register', (req, res) => {
	try {
		usersController.register(req.body)
			.then(result => res.send(result));
	} catch (e) {
		res.send("An error occured");
		console.log("receive req err ", e);
	};
});

Router.post('/login', (req, res) => {
	try {
		usersController.login(req.body)
			.then(result => res.send(result));
	} catch (e) {
		res.send("An error occured");
		console.log("receive req err ", e);
	}
});

Router.get('/search', (req, res) => {
	try {
		let b = req.query;
		if (b.q) {
			usersController.search(b.q).then(result => res.send(result));
		}
		else {
			res.send("Missing query");
		}
	} catch (e) {
		res.send("An error occured");
		console.log("search req err ", e);
	}
});

module.exports = Router;