const imagesModel = require('./imagesModel');
//const md5 = require('md5');

var addLike = (id,likeBy) => {
	return findLike(id, likeBy).then((result) => {
		if (result.length===0) 
			return imagesModel.update(
		    {_id: id}, {$push: {likes: {likeBy: likeBy}}}
		  );
		else return removeLike(id,likeBy);
	});
}

var removeLike = (id,likeBy) => {
  return imagesModel.update({_id: id},
    {$pull: {likes: {likeBy: likeBy}}}
  );
}

var findLike = (id,likeBy) => {
	return imagesModel.find({_id:id, "likes.likeBy": likeBy});
}

var addComment = (id,comment,commentBy) => {
  var commentTimestamp = Date.now();
  return imagesModel.update(
    {_id: id},
    {
      $push: {
      	comments:
	      {
	        comment: comment, 
	        commentBy: commentBy, 
	        commentTimestamp: commentTimestamp, 
	        // Useful, but we have _id anyway, so I'll just leave it here
	        //commentHash: md5(comment+commentBy+commentTimestamp)
	      }
	    }
    }
  );
}


var removeComment = (id,commentHash) => {
  return imagesModel.update({_id: id},
  	{$pull: {comments: {_id: commentHash}}}
  	//_id is faster
    //{$pull: {comments: {commentHash: commentHash}}}
  );
}

var increaseAllViewCount = () => {
  return imagesModel.updateMany({}, {$inc: {views:1}});
}

var increaseViewCountById = (id) => {
  return imagesModel.update({_id: id}, {$inc: {views:1}});
}

var increaseViewCountByName = (name) => {
  return imagesModel.updateMany({name: name}, {$inc: {views:1}});   
}

module.exports = {
	addLike,	
  addComment,
  removeLike,
  removeComment,
  increaseAllViewCount,
  increaseViewCountById,
  increaseViewCountByName
}