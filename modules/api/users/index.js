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

// Router.get('/search', (req, res) => {
// 	try {
// 		let b = req.body;

// 	} catch (e) {

// 	}
// });

module.exports = Router;