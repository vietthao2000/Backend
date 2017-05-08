const imagesModel = require('./imagesModel');
const usersModel = require('../users/usersModel');
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
		});
	}
	catch (e) {
		// console.log(e);
		return processError();
	}
}

var processError = () => {
	return new Promise(cb => cb("An error occured"));
}

var cookImages = async ((raw, getOne) => {
	var result = [];
	var ids = [];
	raw.forEach(image => {
		await (
			process(usersModel.findOne({_id: image.creator}))
			.then(user => {
				var cooked = {
					id: image.id,
					imageUrl: image.imageLink,
					view: image.views,
					date: image.created,
					plus: image.likes.length,
					posterAvatar: user.avatarLink,
					posterName: user.name,
					posterTitle: image.description,
					content: image.name,
				};

				if (getOne) {
					cooked.comments = image.comments;
					image.comments.forEach(comment => {
						if (ids.indexOf(comment.commentBy)===-1) {
							ids.push(comment.commentBy);
							// console.log("Pushing");
						}
					});
				}
				result.push(cooked);
				// console.log("Cooking");
			})
		);
	});

	if (getOne) {
		result = result[0];
		await (
			usersModel.find({"_id":{$in: ids}}).then(map => {
				result.comments.forEach((comment, j) => {
					map.forEach(element => {
						if (element._id===comment.commentBy) {
							result.comments[j].commentAvatar = element.avatarLink;
							result.comments[j].commentName = element.username;
						}
					})
				});
			})
		);
	}
	// console.log("Done");
	return result;
})

var addImage = (data) => {
	return process(imagesModel.create(data));
}

var fetchImageCollection = () => {
	return process(imagesModel.find({})
	.then(raw => {
		return cookImages(raw,false)
	}));
}

var fetchImageCollectionById = (id) => {
	return process(imagesModel.find({_id: id}).lean()
	.then(raw => {
		return cookImages(raw, true);
	}));
}

var fetchImageCollectionByName = (name) => {
	return process(imagesModel.find({name: name})
	.then(raw => {
		return cookImages(raw, false);
	}));
}

var searchImageCollection = (q) => {
	return process(
		imagesModel.find({
			$or:[
				{"name":{$regex : q}}, 
				{"description":{$regex : q}}
			]
		})
		.then(raw => {
			return cookImages(raw, false);
		})
	);
}

var updateImageCollectionById = (id, newData) => {
	//imagesModel.update({_id: {$gt: 1}}, {$inc:{_id:-1}})
	return process(imagesModel.update({_id: id}, newData));
}

var updateImageCollectionByName = (name, newData) => {
	return process(imagesModel.updateMany({name: name}, newData));
}

var deleteImageCollectionById = (id) => {
	return process(imagesModel.deleteOne({_id: id}));
}

var deleteImageCollectionByName = (name) => {
	return process(imagesModel.deleteMany({name: name}));
}

module.exports = {
	fetchImageCollection,
	fetchImageCollectionById,
	fetchImageCollectionByName,
	updateImageCollectionById,
	updateImageCollectionByName,
	deleteImageCollectionById,
	addImage,
	searchImageCollection
}
