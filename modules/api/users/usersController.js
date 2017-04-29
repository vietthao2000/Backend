const usersModel = require("./usersModel");
const md5 = require('md5');
const validator = require('validator');

var process = (work) => {
	try {
		return work.then((status) => {
			if (status.ok && status.n && status.nModified) {
				if (status.ok) return `Query success, ${status.n} row(s) found, ${status.nModified} row(s) affected`;
				else return `Query failed`;      
			}
			return status;
		}).catch((err) => {
			return err;
			console.log("validation ",err);
		});
	}
	catch (e) {
		console.log("process err ", e);
		return processError();
	}
}

// var format = (data) => {

// }

var register = (data) => {
	if (data.password) data.password = md5(data.password);
	return process(usersModel.create(data)).then(result => {
		if (result.errors) return result;
		else return {_id : result._id};
	});
}

var login = (data) => {
	if (data.login && data.password) {
		let postData = {
			password: md5(data.password)
		}
		if (validator.isEmail(data.login)) postData.email = data.login;
		else postData.username = data.login;
		return process(usersModel.findOne(postData, '_id')).then(result => {
			//Handle login blah blah I'll do it later

			//
			return result;
		});
	}
	else return new Promise(cb => {
		cb("Not enough data");
	});
}

// var search = (query) => {

// }

module.exports = {
	register,
	login
}