const express = require('express');
const Router = express.Router();
const usersController = require('./usersController');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rolesModel = require('./rolesModel');

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
			req.session.permissions = result.permissions.users;
			next();
		});
	}
	else {
		rolesModel.findOne({"role": "guest"})
		.then(result => {
			req.session.permissions = result.permissions.users;
			next();
		});
	}
};

Router.use(assignPermission);

Router.post('/register', (req, res) => {
	try {
		usersController.register(req.body)
			.then(result => res.send(result));
	} catch (e) {
		res.send("An error occured");
		console.log("receive req err ", e);
	};
});

Router.post('/signin', (req, res) => {
	try {
		usersController.login(req.body)
			.then(result => {
				if (result) {
					req.session.user = result;
					res.redirect('/');
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

Router.get('/signout', (req, res) => {
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

Router.get('/me', (req, res) => {
	try {	
		res.send(req.session.user || {username: "Guest", avatar: "/assets/images/male.jpg", guest: true})
	} catch (e) {
		res.send("An error occured");
		console.log("get session err ", e);
	}
});

module.exports = Router;