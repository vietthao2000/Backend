const express = require('express');
const Router = express.Router();
const usersController = require('./usersController');
// const session = require('express-session');
const cookieParser = require('cookie-parser');
// const rolesModel = require('./rolesModel');
const md5 = require('md5');
const permission = require('../permissions/');

Router.use(permission.assignPermission);

var verifyPermission = (req, res, next, permission) => {
	console.log(req.permissions);
	if (req.permissions.users[permission]===1) {
		next();
	}
	else {
		res.send({
			errors: {"permission": {"message": "No permission"}}
		});
	}
};

Router.post('/register', (req, res) => {
	try {
		usersController.register(req.body)
			.then(result => res.send(result));
	} catch (e) {
		res.send("An error occured");
		console.log("receive req err ", e);
	};
});

Router.post('/signin', (req, res, next) => {
	try {
		usersController.login(req.body)
			.then(result => {
				if (result) {
					req.session.user = result;
					req.session.token = md5(Math.random()*1000000+result.username);
					res.cookie('token', req.session.token);
					res.redirect('/');
					next();
				}
				else {
					res.send("Login failed");
				}
			});
	} catch (e) {
		res.send("An error occured");
		console.log("receive req err ", e);
	}
}, permission.assignPermission);

Router.get('/signout', (req, res) => {
	try {
		res.clearCookie('token');
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
}, permission.assignPermission);

Router.get('/', (req, res, next) => {verifyPermission(req, res, next, 'write')},
	(req, res) => {
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

Router.put('/', (req, res, next) => {verifyPermission(req, res, next, 'write')},
	(req, res) => {
		try {
			let b = req.body;
			usersController.update(req.body).then(result => res.send(result));
		} catch (e) {
			res.send("An error occured");
			console.log("search req err ", e);
		}
	});

Router.get('/me', (req, res) => {
	try {	
		res.send(req.session.user || {name: "Guest", avatar: "/assets/images/male.jpg", guest: true})
	} catch (e) {
		res.send("An error occured");
		console.log("get session err ", e);
	}
});

module.exports = Router;