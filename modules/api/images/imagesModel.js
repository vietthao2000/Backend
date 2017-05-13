const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const v = require('mongoose-validators');
const autoIncrement = require('mongoose-auto-increment');
var uniqueValidator = require('mongoose-unique-validator');

var imagesModel = new Schema({
	name: {type: String, required: !0},
	imageLink: {type: String, 
		required: !0,
		validate: [
			v.isURL()
		]
	},
	description: {type: String, default: ''},
	views: {type: Number, default: 0},
	created: {type: Date, default: Date.now()},
	creator: {type: Number, required: !0},
	likes: [{
		likeBy: {type: Number}
	}],
	comments: [{
		comment: {type: String},
		commentBy: {type: Number},
		commentTimestamp: {type: Date, default: Date.now},
		//commentHash: {type: String}
	}]
});

imagesModel.plugin(autoIncrement.plugin, {
	model: 'images',
	startAt: 1
});

module.exports = mongoose.model('images', imagesModel);