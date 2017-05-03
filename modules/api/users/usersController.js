const usersModel = require("./usersModel");
const md5 = require('md5');
const validator = require('validator');
const unidecode = require('unidecode');

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

var normalize = (st) => {
	st = unidecode(st);
	return st.replace(/[^0-9a-zA-z]/g,"");
}

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

var search = (q) => {
	return new Promise(cb => {
		var result = [];
		searchByUserName(normalize(q)).then(r => {
			if (r) r.forEach(element => {result.push(element['_id'])});
			searchByName(q).then(r => {
				if (r) r.forEach(element => {if (result.indexOf(element['_id'])===-1) result.push(element['_id'])});
				cb(result);
			});
		});
	});
}

var searchByUserName = (q) => {
	return process(usersModel.find({"username": {$regex: q, $options: "g"}}, "_id"))
		.then(r => {return r});
}

var searchByName = (q) => {
	return process(usersModel.find({"name": {$regex: q.replace(" ","|"), $options: "g"}}, "_id"))
		.then(r => {return r});
}

module.exports = {
	register,
	login,
	search
}