const usersModel = require("./usersModel");
const md5 = require('md5');
const validator = require('validator');
const unidecode = require('unidecode');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

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
		return process(usersModel.find(postData).lean()).then(raw => {
			return cookUsers(raw, true);
		});
	}
	else return new Promise(cb => {
		cb("Not enough data");
	});
}

var update = (data) => {
	if (data.id && (data.email || data.avatar)) {
		var newData = {}
		if (data.email) newData.email = data.email;
		if (data.avatar) newData.avatarLink = data.avatar;
		return process(
			usersModel.update({"_id": data.id}, newData)
			.then((result) => {
				// console.log("Processing");
				if (result.ok!==1) {
					// console.log("Error");
					return "An error occured";
				}
				else {
					if (result.nModified>0) {
						usersModel.update(
							{"_id": data.id}, 
							{"updated": new Date().toISOString()}
						).then(() => {});
						// console.log("Updated");
						return "Update successful";
					} else {
						// console.log("Not updated");
						return "No update was made";
					}
				};
		}));
	}
	else return new Promise (cb => {
		cb("Not enough data");
	});
}

var cookUsers = (raw, getOne) => {
	var result = [];
	raw.forEach(user => {
		var cooked = {
			id: user._id,
			username: user.username,
			email: user.email,
			avatar: user.avatarLink,
			createdDate: user.created,
			updatedDate: user.updated
		};
		result.push(cooked);
	});
	if (getOne) result=result[0];
	return result;
}

var search = async ((q) => {
	var usernameList, emailList;
	await(searchByUserName(q).then(usernames => {
		usernameList = cookUsers(usernames, false);
	}));

	await(searchByEmail(q).then(emails => {
		emailList = cookUsers(emails, false);
	}));
	var result = Object.assign(usernameList, emailList);
	return result;
})

var searchByUserName = (q) => {
	return process(usersModel.find({"username": {$regex: normalize(q), $options: "g"}}));
}

var searchByName = (q) => {
	return process(usersModel.find({"name": {$regex: q.replace(" ","|"), $options: "g"}}));
}

var searchByEmail = (q) => {
	return process(usersModel.find({"email": {$regex: normalize(q), $options: "g"}}));
}

var searchByUserId = (q) => {
	return process(usersModel.find({"_id": q}).then(raw => {return cookUsers(raw, true)}));
}

var getAllUsers = () => {
	return process(usersModel.find({}).then(raw => {
		return cookUsers(raw);
	}));
}


module.exports = {
	register,
	login,
	update,
	search,
	getAllUsers,
	searchByUserId
}