const mongoose = require('mongoose');
const v = require('mongoose-validators');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var rolesModel = new Schema({
	role: {type: String, required: !0},	
	permissions: {
		images: {
			read: {type: Number, required: !0},
			write: {type: Number, required: !0},
			update: {type: Number, required: !0},
			delete: {type: Number, required: !0}
		},
		users:{
			read: {type: Number, required: !0},
			write: {type: Number, required: !0},
			update: {type: Number, required: !0},
			delete: {type: Number, required: !0}
		}
	}
});

rolesModel.plugin(uniqueValidator);

module.exports = mongoose.model('roles', rolesModel);