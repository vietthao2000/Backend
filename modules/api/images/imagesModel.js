const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var imagesModel = new Schema({
	id: {type: Number, require: true},
	name: {type: String, default: ''},
	imageLink: {type: String, default: ''},
	description: {type: String},
	views: {type: Number, default: 0},
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