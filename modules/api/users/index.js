const express = require('express');
const Router = express.Router();
const usersController = require('./usersController');
const session = require('express-session');

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
			.then(result => {
				if (result) {
					req.session.user = result;
					res.send("Login success");
				}
				else {
					res.send("Login failed");
				}
			});
	} catch (e) {
		res.send("An error occured");
		console.log("receive req err ", e);
	}
});

Router.get('/logout', (req, res) => {
	try {
		if (req.session.user) {
			req.session.destroy();
			res.redirect("/");
		}
		else {
			res.send("Not logged in");
		}
	}
	catch  (e) {
		res.send("An error occured");
		console.log("logout err ", e);	
	}
});

Router.get('/', (req, res) => {
	try {
		let b = req.query;
		if (b.s) {
			usersController.search(b.s).then(result => res.send(result));
		}
		else if (b.id) {
			usersController.searchByUserId(b.id).then(result => res.send(result));
		}
		else {
			usersController.getAllUsers().then(result => res.send(result));
		}
	} catch (e) {
		res.send("An error occured");
		console.log("search req err ", e);
	}
});

Router.put('/', (req, res) => {
	try {
		let b = req.body;
		usersController.update(req.body).then(result => res.send(result));
	} catch (e) {
		res.send("An error occured");
		console.log("search req err ", e);
	}
})

module.exports = Router;