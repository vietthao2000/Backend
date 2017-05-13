const mongoose = require('mongoose');
const v = require('mongoose-validators');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
var uniqueValidator = require('mongoose-unique-validator');

var usersModel = new Schema({
	// _id is still fine
	// uid: {type: Number},
	username: {type: String, 
		unique: !0,
		required: !0,
		validate: [
			v.isAlphanumeric(),
			v.isLength(6,20)
		], 
	},
	email: {type: String, 
		required: !0,
		unique: !0,
		validate: [
			v.isEmail()
		],
	},
	password: {type: String, 
		required: !0,
		validate: [
			v.isLength(8), 
			v.isAscii()
		],
	},
	gender: {type: String, 
		required: !0,
		validate: [
			v.matches(/male|female/)
		],
	},
	name: {type: String,
		required: !0,
		// validate: [
		// ]
	},
	avatarLink: {type: String, default: ''},
	bio: {type: String, default: ''},
	created: {type: Date, default: Date.now()},
	updated: {type: Date, default: Date.now()},
	friends: [{
		uid: {type: Number}
	}],
	role: {type: String, default: "user", ref: "role"}
});

usersModel.plugin(autoIncrement.plugin, {
	model: 'users',
	startAt: 1
});

usersModel.plugin(uniqueValidator);

module.exports = mongoose.model('users', usersModel);