const express = require('express');
const session = require('express-session');
var router = express();

router.use(express.static(__dirname));

router.get('/',(req, res) => {
	res.sendFile(__dirname + "/index.html");
});

router.get('/login', (req, res) => {
	try {
		if (req.session.user) {
			res.redirect('/');
		}
		else {
			res.sendFile(__dirname + "/login.html");
		}
	}
	catch (e) {
		console.log(e);
		res.send("An error occured");
	}
});

router.get('/upload', (req, res) => {
	try {
		if (req.session.user) {
			res.sendFile(__dirname + "/upload.html");
		}
		else {
			res.redirect('/login');
		}
	}
	catch (e) {
		console.log(e);
		res.send("An error occured");
	}
});

router.get('/register', (req, res) => {
	try {
		if (req.session.user) {
			res.redirect('/');
		}
		else {
			res.sendFile(__dirname + "/register.html");
		}
	}
	catch (e) {
		console.log(e);
		res.send("An error occured");
	}
});

module.exports = router;